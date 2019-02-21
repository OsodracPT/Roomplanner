import os
import sys
import datetime
import pprint
import copy
from config import app_config
import json
import psycopg2
import psycopg2.extras


pav = 'E'
start_date ='2018-02-01'
end_date ='2018-12-31'

#array that should contain all the room numbers
rooms =[]
#number of days in the dates provided
number_of_days=0

#dictionary containing
room_visits = {}

#dictionary
room_segments = []

#Define our connection string
conn_string=os.getenv('CONN_STRING')

def find_segments(segments, start_days, end_days):
    #print(start_days, end_days)
    end_segment=None
    start_segment=None

    for index, segment in enumerate(segments):
        if segment['start'] <= start_days and start_days < segment['end']:
            start_segment = index
        if segment['start'] < end_days and end_days <= segment['end']:
            end_segment = index
        else:
            ("BUG: something is not right")

    #print(segments[0])
    return_values = [start_segment, end_segment, segments]
    return return_values

def alloc():
    try:
        conn = psycopg2.connect(conn_string)
        cur = conn.cursor()
        get_rooms_cur = conn.cursor()
        get_occupancy_cur =  conn.cursor()
        get_days_cur = conn.cursor()

        # Print PostgreSQL version
        cur.execute("SELECT version();")
        print(sys.version)
        record = cur.fetchone()
        print("You are connected to - ", record,"\n")
        
        get_rooms_query = """SELECT room_number FROM testing_schema_pedro.cms_room_v WHERE pav_initial=%s ORDER BY room_number"""
        get_occupancy_query = """SELECT title, forenames, surname, room_number,crsid,start_date,end_date, 
        GREATEST(start_date, %s::DATE)-%s AS start_days, LEAST(end_date, %s::DATE)-%s::DATE + 1 AS end_days FROM testing_schema_pedro.occupant_v 
        JOIN testing_schema_pedro.cms_room_v USING (room_id) WHERE pav_initial=%s AND (start_date, end_date) OVERLAPS (%s,%s) ORDER BY room_number,start_date"""
        get_days_query = """SELECT %s::DATE - %s::DATE"""
        get_occupancy_cur.execute(get_occupancy_query,(start_date, start_date, end_date, start_date, pav, start_date, end_date))
        get_rooms_cur.execute(get_rooms_query, pav)
        get_days_cur.execute(get_days_query, (end_date, start_date))



        #get all the room numbers from the pavillion provided
        #populate the keys in the dictionary room_visits accord
        rooms = get_rooms_cur.fetchall()

        for row in rooms:
            #print(row)
            room_visits[row[0]] = []
            temp = {'room_name': row[0], 'segments': ''}
            temp['segments'] = [{'start':'','end':'', 'occupants':[]}]
            room_segments.append(copy.deepcopy(temp))

        #return number of days in time interval provided
        number_of_days = get_days_cur.fetchone()
        number_of_days = number_of_days[0] + 1 #dont know yet why I am adding one
        print(number_of_days)
        
        # print(room_visits)

        occupancy = get_occupancy_cur.fetchall()
        # occupancy_list = [list(elem) for elem in occupancy]

        occupancy_list=[dict(zip(map(lambda col: col.name, get_occupancy_cur.description), row)) for row in occupancy] 

        # print((occupancy_list))
        for i in range(len(occupancy_list)):
            #print(occupancy_list[i])
            if occupancy_list[i]['title'] == None:
                occupancy_list[i]['title'] = ''
            if occupancy_list[i]['surname'] == None:
                occupancy_list[i]['surname'] = ''
            if occupancy_list[i]['forenames'] == None:
                occupancy_list[i]['forenames'] = ''
            if occupancy_list[i]['crsid'] == None:
                occupancy_list[i]['crsid'] = 'unknown_crsid'
            if occupancy_list[i]['start_date'] == datetime.date(1, 1, 1):
                occupancy_list[i]['start_date'] = 'unknown date'
            if occupancy_list[i]['end_date'] == datetime.date(9999, 12, 31):
                occupancy_list[i]['end_date'] = 'indefinite end'

            #Add occupancy entry in the respective room key in the dictionary
            room_visits[occupancy_list[i]['room_number']].append(occupancy_list[i])

        #print(room_visits)        

        for index, room in enumerate(rooms):

            # naming the key in the dictionary to increase readability
            room_number=room[0]
            
            room_segments[index]['segments'][0]['start']=0
            #print(room_segment[i]['segments'])
            room_segments[index]['segments'][0]['end']=number_of_days
            #print(room_segment[i]['segments'])

            segments = [{'start':0,'end':number_of_days, 'occupants':[]}]

            #remove all the rooms that dont have visits from the array
            room_visits_rem = {k: v for k, v in room_visits.items() if v}

            if room_number in room_visits_rem:
                visits = room_visits_rem[room_number]
                #print(visits)
                

                #loop through each visit in a room
                for index_visit, visit in enumerate(visits):
                    #print(visit)
                    # providing better names to my variables 
                    start_days = visit['start_days']
                    #print(start_days)
                    end_days = visit['end_days']
                    #print(segments)
                    visit_segments = find_segments(segments, start_days, end_days)
                    #print(visit)
                    first_segment = visit_segments[2][0]
                    #print(first_segment)
                    last_segment = visit_segments[2][-1]
                    #print(last_segment)
                    first_index=visit_segments[0] 
                    last_index=visit_segments[1]

                    #print(visit_segments[2])
                   
                    if first_segment['start'] < start_days:
                        #Clone last segment
                        new_segment = {'start': copy.deepcopy(first_segment['start']), 'end':start_days, 'occupants': copy.deepcopy(first_segment['occupants'])}
                        first_segment['start'] = start_days
                        segments.append(new_segment)
                        last_index = last_index + 1

                    if last_segment['end'] > end_days:
                        #Clone last segment
                        new_segment = {'start': end_days, 'end': copy.deepcopy(last_segment['end']), 'occupants': copy.deepcopy(last_segment['occupants'])}
                        last_segment['end'] = end_days
                        segments.append(new_segment)

                        

                    #print("Adding visit", visit['crsid'], visit['room_number'])
                    #print(visit_segments[2][0])

                    #visit_segments[2][0]['occupants']=[visit]
                    #print(visit_segments[2])
                    visit_segments[2][0]['occupants'].append(visit)
            #print(segments)
            room_segments[index]['segments']=copy.deepcopy(segments)

    except psycopg2.OperationalError as e:
        print("Can't connect to database")
        print('Error message:\n{0}').format(e)


    finally:
        #closing database connection.
            if(conn):
                cur.close()
                conn.close()
                print("PostgreSQL connection is closed")
                pprint.pprint(room_segments, width=1)
                return(room_segments)

alloc()

