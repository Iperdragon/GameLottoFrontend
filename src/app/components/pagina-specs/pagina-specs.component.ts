import { Component } from '@angular/core';
import {VideogameDTORespCover} from '../../model/VideogameDTORespCover';
import {VideogameDTORespSpec} from '../../model/VideogameDTORespSpec';
import {RoundLoaderService} from '../../services/round-loader.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-pagina-specs',
  imports: [
    FormsModule
  ],
  templateUrl: './pagina-specs.component.html',
  standalone: true,
  styleUrl: './pagina-specs.component.css'
})
export class PaginaSpecsComponent
{
  maxStep:number=9;
  step:number=0;
  idsUsed:number[]=[];
  spec:VideogameDTORespSpec|null=null;
  answer:string="";

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
        this.spec=res as VideogameDTORespSpec;
      }
    )
  }

  controllaRisposta3()
  {
    if(this.spec!.name==this.answer)
    {
      this.idsUsed.push(this.spec!.id!);
      this.caricaRound3()
    }
    else
    {
      if(this.step<this.maxStep)
      {
        this.step++;
        this.blurImg3();
      }
      else
      {
        this.terminaGame3();
      }
    }
  }


  private blurImg3() {

  }

  private terminaGame3() {

  }
}
