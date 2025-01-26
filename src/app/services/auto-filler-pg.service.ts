import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutoFillerPgService {

  frasiPg:string[]=[]

  constructor(private http:HttpClient)
  {
    http.get<string[]>("/api/pgs/games").subscribe
    (
      res=>
      {
        this.frasiPg=res;
      }
    )
  }
}
