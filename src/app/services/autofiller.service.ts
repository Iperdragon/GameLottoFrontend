import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutofillerService {

  frasi:string[]=[]
  constructor(private http:HttpClient)
  {
    http.get<string[]>("/api/videogames/names").subscribe
    (
      res=>
      {
        this.frasi=res;
      }
    )
  }
}
