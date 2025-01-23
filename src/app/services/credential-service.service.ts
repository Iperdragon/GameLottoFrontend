import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Registration} from '../model/Registration';

@Injectable({
  providedIn: 'root'
})
export class CredentialServiceService {

  constructor(private http:HttpClient) { }
  token: any=null;

  login(credenziali:any):void
  {
    this.http.post("/api/users/login", credenziali, {responseType: "text"}).subscribe(
      resp=>
      {
        this.token=resp;
      }
    )
  }

  register(register: Registration)
  {
    this.http.post("/api/users/register", register, {responseType: "text"}).subscribe(
      resp=>
      {
        this.token=resp;
      }
    )
  }
}
