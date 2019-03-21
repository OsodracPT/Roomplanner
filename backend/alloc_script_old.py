import os
import sys
import datetime
from config import app_config
import json
import psycopg2
import psycopg2.extras


pav = 'E'
dates = ['2018-06-01', '2018-12-31']
start_date ='2018-02-01'
end_date ='2018-12-31'

#array that should contain all the room numbers
rooms =[]
#number of days in the dates provided
number_of_days=0

#dictionary containing
room_visits = {}

#dictionary
room_segments = {}


#Define our connection string
conn_string=os.getenv('CONN_STRING')

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
            room_segments[row[0]] = []

        #return number of days in time interval provided
        number_of_days = get_days_cur.fetchone()
        number_of_days = number_of_days[0] + 1 #dont know yet why I am adding one
        print(number_of_days)
        
        # print(room_visits)

        occupancy = get_occupancy_cur.fetchall()
        occupancy_list = [list(elem) for elem in occupancy]

        results=[dict(zip(map(lambda col: col.name, get_occupancy_cur.description), row)) for row in occupancy] 


        # print((occupancy_list))
        for i in range(len(occupancy_list)):
            if occupancy_list[i][0] == None:
                occupancy_list[i][0] = ''
            if occupancy_list[i][1] == None:
                occupancy_list[i][1] = ''
            if occupancy_list[i][2] == None:
                occupancy_list[i][2] = ''
            if occupancy_list[i][4] == None:
                occupancy_list[i][4] = 'unknown_crsid'
            if occupancy_list[i][5] == datetime.date(1, 1, 1):
                occupancy_list[i][5] = 'unknown date'
            if occupancy_list[i][6] == datetime.date(9999, 12, 31):
                occupancy_list[i][6] = 'indefinite end'

            #Add occupancy entry in the respective room key in the dictionary
            room_visits[occupancy_list[i][3]].append(occupancy_list[i])
                    

        #loop index for rooms
        i=0

        for room in rooms:
            i = i +1

            # naming the key in the dictionary to increase readability
            room_number=room[0]

            room_segments[room_number]=[[0,number_of_days,[]]]
            #remove all the rooms that dont have visits from the array
            room_visits_rem = {k: v for k, v in room_visits.items() if v}

            if room_number in room_visits_rem:
                visits = room_visits_rem[room_number]

                #loop index for visits
                v=0

                #loop through each visit in a room
                for visit in visits:
                    #print(visit)
                    # providing better names to my variables 
                    start_days = visit[7]
                    end_days = visit[8]
                    #print(visit)

                    #I have created a monster. 
                    # if we are in the first iteration of the loop and the start days of the visit is not zero
                    # then we need to add a segment in the begining to state [0,start_days]
                    if v == 0 and start_days!= 0:
                        room_segments[room_number][0][0] = 0
                        room_segments[room_number][0][1] = start_days
                        room_segments[room_number].append([start_days, end_days, visit])
                        #print(visit)
                    #if we are in the first iteration of the loop and the start is zero
                    # then we simply append the visit to the dictionary
                    elif v == 0:
                        room_segments[room_number][0][0] = start_days
                        room_segments[room_number][0][1] = end_days
                        room_segments[room_number][0][2].append(visit)
                        
                    #if the the start days of the currant visit is different from the visit already present
                    # then we need to append a whole new segment to the room    
                    elif start_days != room_segments[room_number][0][0]:
                        room_segments[room_number].append([start_days, end_days, visit])
                    else:
                        room_segments[room_number][0][2].append(visit)
                        #print(visit)

                    v = v + 1

        
    except psycopg2.OperationalError as e:
        print("Can't connect to database")
        print('Error message:\n{0}').format(e)


    finally:
        #closing database connection.
            if(conn):
                cur.close()
                conn.close()
                print("PostgreSQL connection is closed")
                print(results)
                return(room_segments)

alloc()