import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoundLoaderService {

  constructor(private http:HttpClient) { }

  loadCover(ids:number[])
  {
    return this.http.post("/api/videogames/cover", ids);
  }
}
