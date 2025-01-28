import {ChangeDetectorRef, Component, ElementRef, Renderer2} from '@angular/core';
import {VideogameDTORespCover} from '../../model/VideogameDTORespCover';
import {PGDTOResp} from '../../model/PGDTOResp';
import {RoundLoaderService} from '../../services/round-loader.service';
import {FormsModule} from '@angular/forms';
import {VideogameDTORespCompl} from '../../model/VideogameDTORespCompl';
import {NgForOf, NgIf} from '@angular/common';
import {AutofillerService} from '../../services/autofiller.service';
import {AutoFillerPgService} from '../../services/auto-filler-pg.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-pagina-characters',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './pagina-characters.component.html',
  standalone: true,
  styleUrl: './pagina-characters.component.css'
})
export class PaginaCharactersComponent
{
  hearts: string[] = Array(5).fill('https://i.postimg.cc/hG7x2qPt/HEART.webp');
  mostraReStart: boolean = false;
  mostraProssimo: boolean = false;
  mostraDescrizione:boolean=false;
  mostraRispondi:boolean=true;
  showTendina:boolean=false;
  maxStep:number=5;
  step:number=0;
  idsUsed:number[]=[];
  pg:PGDTOResp|null=null;
  answer:string="";

  constructor(private loader:RoundLoaderService,
              private auto:AutoFillerPgService,
              private renderer: Renderer2,
              private cdRef: ChangeDetectorRef,
              private el: ElementRef
)
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
        this.resetPurpleBorder();
        this.hearts=Array(5).fill('https://i.postimg.cc/hG7x2qPt/HEART.webp')
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
      this.setGreenBorder();
    }
    else
    {
      if(this.step<this.maxStep-1)
      {
        this.hearts[this.step] = 'https://i.postimg.cc/VNS92C41/heart2.webp'
        this.step++;
        this.answer="";
        this.flashRedBorder()
      }
      else
      {
        this.hearts[this.step] = 'https://i.postimg.cc/VNS92C41/heart2.webp'
        this.answer="";
        this.flashRedBorder()
        this.terminaGame2();
      }
    }
  }

  private terminaGame2()
  {
    alert('Game Over! ' + '\n'+
      'Il gioco è: '+this.pg?.game);
    this.mostraReStart = true;
    this.mostraRispondi=false;
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



  private flashRedBorder(): void {
    const frameElement = this.el.nativeElement.querySelector('.custom-frame');
    if (frameElement) {
      this.renderer.setStyle(frameElement, 'background-image', "url('https://i.postimg.cc/jSvKBW28/cornice-rossa-semplice.webp')"); // Cambia a rosso
      setTimeout(() => {
        this.renderer.setStyle(frameElement, 'background-image', "url('https://i.postimg.cc/tC39tvjG/corniceviolasemplice.webp')"); // Torna al blu
      }, 200); // Torna blu dopo 500ms
    }
  }

  private setGreenBorder(): void {
    const frameElement = this.el.nativeElement.querySelector('.custom-frame');
    if (frameElement) {
      this.renderer.setStyle(frameElement, 'background-image', "url('https://i.postimg.cc/25KY8P4h/cornice-verde-semplice.webp')"); // Cornice verde
    }
  }

  private resetPurpleBorder(): void {
    const frameElement = this.el.nativeElement.querySelector('.custom-frame');
    if (frameElement) {
      this.renderer.setStyle(frameElement, 'background-image', "url('https://i.postimg.cc/tC39tvjG/corniceviolasemplice.webp')"); // Cornice viola
    }
  }

  nascondiTendina()
  {
    setTimeout(()=>{this.showTendina=false}, 200)
  }
}
