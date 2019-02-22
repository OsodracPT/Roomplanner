import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

getPavC() {
  return this.http.get(this.baseApiUrl + 'rooms/pavC', {headers: headers});
}

getPavH() {
  return this.http.get(this.baseApiUrl + 'rooms/pavH', {headers: headers});
}

getSegments() {
  return this.http.get(this.baseApiUrl + 'alloc', {headers: headers});
}
getDays() {
  return this.http.get(this.baseApiUrl + 'get_days', {headers: headers});
}
}
