import { Component } from '@angular/core';
import {VideogameDTORespCover} from '../../model/VideogameDTORespCover';
import {PGDTOResp} from '../../model/PGDTOResp';
import {RoundLoaderService} from '../../services/round-loader.service';
import {FormsModule} from '@angular/forms';
import {VideogameDTORespCompl} from '../../model/VideogameDTORespCompl';

@Component({
  selector: 'app-pagina-characters',
  imports: [
    FormsModule
  ],
  templateUrl: './pagina-characters.component.html',
  standalone: true,
  styleUrl: './pagina-characters.component.css'
})
export class PaginaCharactersComponent
{
  maxStep:number=9;
  step:number=0;
  idsUsed:number[]=[];
  pg:PGDTOResp|null=null;
  answer:string="";

  constructor(private loader:RoundLoaderService)
  {
    this.caricaRound4();
  }

  caricaRound4()
  {
    this.loader.loadPG(this.idsUsed).subscribe
    (
      res=>
      {
        this.step=0;
        this.pg=res as PGDTOResp;
      }
    )
  }

  controllaRisposta2()
  {
    if(this.pg!.game==this.answer)
    {
      this.idsUsed.push(this.pg!.id!);
      this.caricaRound4();
    }
    else
    {
      if(this.step<this.maxStep)
      {
        this.step++;
      }
      else
      {
        this.terminaGame2();
      }
    }
  }

  private terminaGame2()
  {

  }
}
