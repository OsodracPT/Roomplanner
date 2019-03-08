import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalVariable } from '../global';
import { Observable } from 'rxjs';
import { Computer } from '../_models/computer';
import { Room } from '../_models/room';
import { Person } from '../_models/person';

const secret = GlobalVariable.SECRET;

let headers = new HttpHeaders();
headers = headers.append('Authorization', 'Basic ' + btoa(secret));
headers = headers.append('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  constructor(private http: HttpClient) { }

  getComputers() {
    return this.http
    .get(this.baseApiUrl + 'computers', {headers: headers});
}

getComputer(id): Observable<Computer> {
  return this.http.get<Computer>(this.baseApiUrl + 'computers/' + id, {headers: headers});
}

getPersons() {
  return this.http.get(this.baseApiUrl + 'persons', {headers: headers});
}

getPerson(id): Observable<Person> {
return this.http.get<Person>(this.baseApiUrl + 'persons/' + id, {headers: headers});
}

getComputersPavC() {
  return this.http.get(this.baseApiUrl + 'computers/pavC', {headers: headers});
}

getComputersPavH() {
  return this.http.get(this.baseApiUrl + 'computers/pavH', {headers: headers});
}

getRooms() {
  return this.http.get(this.baseApiUrl + 'rooms', {headers: headers});
}

getRoom(id): Observable<Room> {
  return this.http.get<Room>(this.baseApiUrl + 'rooms/' + id, {headers: headers});
}

getComputersInRoom(id): Observable<Room> {
  return this.http.get<Room>(this.baseApiUrl + 'rooms/' + id + '/computers', {headers: headers});
}

getPersonsInRoom(id): Observable<Person> {
  return this.http.get<Person>(this.baseApiUrl + 'rooms/' + id + '/persons', {headers: headers});
}

updateRoom(id: number, room: Room) {
  return this.http.put(this.baseApiUrl + 'rooms/' + id, room, {headers: headers});
}

getLocations() {
  return this.http.get(this.baseApiUrl + 'locations', {headers: headers});
}

updateComputer(id: number, computer: Computer) {
  return this.http.put(this.baseApiUrl + 'computers/' + id, computer, {headers: headers});
}

getPavRooms(pav_initial: string) {
  return this.http.get(this.baseApiUrl + 'rooms/pav/' + pav_initial, {headers: headers});
}

getPavH() {
  return this.http.get(this.baseApiUrl + 'rooms/pavH', {headers: headers});
}

// Allocation related

getSegments(pav: string, start_date: string, end_date: string) {
  let params = new HttpParams();
  params = params.append('pav', pav);
  params = params.append('start', start_date);
  params = params.append('end', end_date);

  return this.http.get(this.baseApiUrl + 'alloc', {headers: headers, params: params});
}
getDays(pav: string, start_date: string, end_date: string) {
  let params = new HttpParams();
  params = params.append('pav', pav);
  params = params.append('start', start_date);
  params = params.append('end', end_date);

  return this.http.get(this.baseApiUrl + 'get_days', {headers: headers , params: params});
}

getNumberOfComputers(room_number: string) {
  return this.http.get(this.baseApiUrl + 'rooms/number_of_computers/' + room_number, {headers: headers});
}

}
