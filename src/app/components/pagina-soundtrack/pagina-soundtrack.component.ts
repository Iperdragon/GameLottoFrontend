import { Component } from '@angular/core';
import {VideogameDTORespSound} from '../../model/VideogameDTORespSound';
import {RoundLoaderService} from '../../services/round-loader.service';

@Component({
  selector: 'app-pagina-soundtrack',
  imports: [],
  templateUrl: './pagina-soundtrack.component.html',
  standalone: true,
  styleUrl: './pagina-soundtrack.component.css'
})
export class PaginaSoundtrackComponent
{
  step:number=0;
  idsUsed:number[]=[];
  sound:VideogameDTORespSound|null=null;

  constructor(private loader:RoundLoaderService)
  {
    this.caricaRound2();
  }

  caricaRound2()
  {
    this.loader.loadSound(this.idsUsed).subscribe(
      res=>
      {
        this.step=0;
        this.sound=res as VideogameDTORespSound;
        this.idsUsed.push(this.sound!.id!);
      }
    )
  }
}
