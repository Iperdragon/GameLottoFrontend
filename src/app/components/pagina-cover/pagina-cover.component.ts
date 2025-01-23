import { Component } from '@angular/core';
import {RoundLoaderService} from '../../services/round-loader.service';
import {VideogameDTORespCover} from '../../model/VideogameDTORespCover';

@Component({
  selector: 'app-pagina-cover',
  imports: [],
  templateUrl: './pagina-cover.component.html',
  standalone: true,
  styleUrl: './pagina-cover.component.css'
})
export class PaginaCoverComponent {

  step:number=0;
  idsUsed:number[]=[];
  videogame:VideogameDTORespCover|null=null;

  constructor(private loader:RoundLoaderService)
  {
    this.caricaRound();
  }

  caricaRound()
  {
      this.loader.loadCover(this.idsUsed).subscribe(
        res=>
        {
          this.step=0;
          this.videogame=res as VideogameDTORespCover;
          this.idsUsed.push(this.videogame!.id!);
        }
      )
  }

}
