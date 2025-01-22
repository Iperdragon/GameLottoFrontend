import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParloConIlBackend {

  constructor(private http: HttpClient) {}

  faccioRequestATuttiVideogames()
  {
    this.http.get("/api/videogames");
  }

  faccioRequestACoseVideogames(id:any, type:any)
  {
    this.http.get(`/api/videogames/${id}/${type}`);
  }
}
