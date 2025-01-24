import { Component } from '@angular/core';
import {VideogameDTORespCover} from '../../model/VideogameDTORespCover';
import {PGDTOResp} from '../../model/PGDTOResp';
import {RoundLoaderService} from '../../services/round-loader.service';

@Component({
  selector: 'app-pagina-characters',
  imports: [],
  templateUrl: './pagina-characters.component.html',
  standalone: true,
  styleUrl: './pagina-characters.component.css'
})
export class PaginaCharactersComponent
{
  step:number=0;
  idsUsed:number[]=[];
  videogame:PGDTOResp|null=null;

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
        this.videogame=res as PGDTOResp;
        this.idsUsed.push(this.videogame!.id!);
      }
    )
  }
}
