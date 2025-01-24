import { Component } from '@angular/core';
import {VideogameDTORespCover} from '../../model/VideogameDTORespCover';
import {VideogameDTORespSpec} from '../../model/VideogameDTORespSpec';
import {RoundLoaderService} from '../../services/round-loader.service';

@Component({
  selector: 'app-pagina-specs',
  imports: [],
  templateUrl: './pagina-specs.component.html',
  standalone: true,
  styleUrl: './pagina-specs.component.css'
})
export class PaginaSpecsComponent
{
  step:number=0;
  idsUsed:number[]=[];
  videogame:VideogameDTORespSpec|null=null;

  constructor(private loader:RoundLoaderService)
  {
    this.caricaRound3();
  }

  caricaRound3()
  {
    this.loader.loadSpec(this.idsUsed).subscribe(
      res=>
      {
        this.step=0;
        this.videogame=res as VideogameDTORespSpec;
        this.idsUsed.push(this.videogame!.id!);
      }
    )
  }
}
