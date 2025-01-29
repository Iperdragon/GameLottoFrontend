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
  getThreeRandom(rightAnswer:string):string[]
  {
    let pool=this.frasi.filter(f=>f!=rightAnswer);

    let res:string[]=[];
    for(let i=0;i<3;i++)
    {
      let random=parseInt((Math.random()*pool.length).toFixed(0));

      res.push(pool.splice(random, 1)[0])
    }
    return res;
  }
}
