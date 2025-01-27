import {Component, ElementRef, Renderer2} from '@angular/core';
import {VideogameDTORespCover} from '../../model/VideogameDTORespCover';
import {PGDTOResp} from '../../model/PGDTOResp';
import {RoundLoaderService} from '../../services/round-loader.service';
import {FormsModule} from '@angular/forms';
import {VideogameDTORespCompl} from '../../model/VideogameDTORespCompl';
import {NgForOf, NgIf} from '@angular/common';
import {AutofillerService} from '../../services/autofiller.service';
import {AutoFillerPgService} from '../../services/auto-filler-pg.service';

@Component({
  selector: 'app-pagina-characters',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './pagina-characters.component.html',
  standalone: true,
  styleUrl: './pagina-characters.component.css'
})
export class PaginaCharactersComponent
{
  hearts: string[] = Array(5).fill('https://i.postimg.cc/KjHzc8yt/HEART1.png');
  mostraReStart: boolean = false;
  mostraProssimo: boolean = false;
  mostraDescrizione:boolean=false;
  maxStep:number=5;
  step:number=0;
  idsUsed:number[]=[];
  pg:PGDTOResp|null=null;
  answer:string="";

  constructor(private loader:RoundLoaderService,
              private auto:AutoFillerPgService,)
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
        this.mostraProssimo = false;
        this.mostraDescrizione=false;
        this.hearts=Array(5).fill('https://i.postimg.cc/KjHzc8yt/HEART1.png')
      }
    )
  }

  controllaRisposta2()
  {
    if(this.pg!.game==this.answer)
    {
      this.idsUsed.push(this.pg!.id!);
      this.mostraDescrizione=true;
      this.answer="";
      this.mostraProssimo= true;
    }
    else
    {
      if(this.step<this.maxStep-1)
      {
        this.hearts[this.step] = 'https://i.postimg.cc/MZPXmdjX/HEART2.png'
        this.step++;
        this.answer="";
      }
      else
      {
        this.hearts[this.step] = 'https://i.postimg.cc/MZPXmdjX/HEART2.png'
        this.answer="";
        this.terminaGame2();
      }
    }
  }

  private terminaGame2()
  {
    alert('Game Over! ' + '\n'+
      'Il gioco è: '+this.pg?.game);
    this.mostraReStart = true;
  }

  restartGame2(): void {
    this.idsUsed = [];
    this.step=0;
    this.mostraReStart=false;
    this.answer="";
    this.caricaRound4();
  }

  filteredOptions: string[] = [];

  onInputChange(value: string): void {
    this.answer = value;
    this.filteredOptions = this.auto.frasiPg.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  }

  selectOption(option: string): void {
    this.answer = option;
    this.filteredOptions = [];
  }
}
