import { Component } from '@angular/core';
import {RoundLoaderService} from '../../services/round-loader.service';
import {VideogameDTORespCover} from '../../model/VideogameDTORespCover';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-pagina-cover',
  imports: [
    FormsModule
  ],
  templateUrl: './pagina-cover.component.html',
  standalone: true,
  styleUrl: './pagina-cover.component.css'
})
export class PaginaCoverComponent {

  maxStep:number=9;
  step:number=0;
  idsUsed:number[]=[];
  videogame:VideogameDTORespCover|null=null;
  answer:string="";

  constructor(private loader:RoundLoaderService)
  {
    this.caricaRound();
  }

  caricaRound()
  {
      this.loader.loadCover(this.idsUsed).subscribe(
        res =>
        {
            this.step = 0;
            this.videogame = res as VideogameDTORespCover;
        }
      )
  }

  controllaRisposta()
  {
    if(this.videogame!.name==this.answer)
    {
      this.idsUsed.push(this.videogame!.id!);
      this.caricaRound()
    }
    else
    {
      if(this.step<this.maxStep)
      {
        this.step++;
        this.blurImg();
      }
      else
      {
        this.terminaGame();
      }
    }
  }

  private terminaGame()
  {

  }

  // deve blurrare immagine in base al valore di step
  private blurImg()
  {

  }
}
