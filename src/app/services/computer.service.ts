import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from '../global';

const secret = GlobalVariable.SECRET;

let headers = new HttpHeaders();
headers = headers.append('Authorization', 'Basic ' + btoa(secret));
headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  constructor(private http: HttpClient) { }

  getComputers() {
    return this.http.get(this.baseApiUrl + 'computers', {headers: headers});
}

getComputersPavC() {
  return this.http.get(this.baseApiUrl + 'computers/pavC', {headers: headers});
}

}
