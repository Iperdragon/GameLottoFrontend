import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParloConIlBackend {

  constructor(private http: HttpClient) {}

  faccioRequestATuttiVideogames()
  {
    this.http.get("/api/videogames")
  }
}
