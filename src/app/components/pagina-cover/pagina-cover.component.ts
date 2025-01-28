import {Component, ElementRef, Renderer2, ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {RoundLoaderService} from '../../services/round-loader.service';
import {VideogameDTORespCover} from '../../model/VideogameDTORespCover';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {AutofillerService} from '../../services/autofiller.service';

@Component({
  selector: 'app-pagina-cover',
  imports: [
    FormsModule,
    NgStyle,
    NgForOf,
    NgIf
  ],
  templateUrl: './pagina-cover.component.html',
  standalone: true,
  styleUrl: './pagina-cover.component.css'
})
export class PaginaCoverComponent{
  hearts: string[] = Array(5).fill('https://i.postimg.cc/hG7x2qPt/HEART.webp'); // Percorso immagine cuore pieno
  mostraReStart: boolean = false;
  mostraProssimo: boolean = false;
  mostraRispondi:boolean=true;
  maxStep:number=5;
  step:number=0;
  idsUsed:number[]=[];
  videogame:VideogameDTORespCover|null=null;
  answer:string="";



  constructor(
    private loader: RoundLoaderService,
    private auto:AutofillerService,
    private renderer: Renderer2,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {
    this.caricaRound();
  }



  caricaRound()
  {
      this.loader.loadCover(this.idsUsed).subscribe(
        res =>
        {
            this.step = 0;
            this.videogame = res as VideogameDTORespCover;
            this.setBlur(10);
            this.mostraProssimo = false;
            this.resetPurpleBorder();
            this.hearts=Array(5).fill('https://i.postimg.cc/hG7x2qPt/HEART.webp')
        }
      )
  }

  controllaRisposta()
  {
    if(this.videogame!.name==this.answer)
    {
      this.idsUsed.push(this.videogame!.id!);
      this.setBlur(0);
      this.answer="";
      this.mostraProssimo = true;
      this.setGreenBorder();
    }
    else
    {
      if(this.step<this.maxStep-1)
      {
        this.hearts[this.step] = 'https://i.postimg.cc/VNS92C41/heart2.webp'
        this.step++;
        this.updateBlur();
        this.answer="";
        this.flashRedBorder()
      }
      else
      {
          this.hearts[this.step] = 'https://i.postimg.cc/VNS92C41/heart2.webp'
          this.answer="";
          this.flashRedBorder();
          this.terminaGame();
      }
    }
  }

  private terminaGame(): void {
    alert('Game Over! ' + '\n'+
      'Il gioco è: '+this.videogame?.name);
    this.mostraReStart = true;
    this.mostraRispondi=false;
    this.setBlur(0);
  }

  restartGame(): void {
    this.idsUsed = [];
    this.step=0;
    this.mostraReStart=false;
    this.answer="";
    this.caricaRound();
  }

  private updateBlur(): void {
    // Calcola il nuovo livello di blur in base allo step
    const maxBlur = 10;
    const blurAmount = maxBlur - (this.step / this.maxStep) * maxBlur+4;
    this.setBlur(blurAmount);
  }

  private setBlur(blurAmount: number): void {
    const imgElement = this.el.nativeElement.querySelector('#img2');
    if (imgElement) {
      this.renderer.setStyle(imgElement, 'filter', `blur(${blurAmount}px)`);
    }
  }

  filteredOptions: string[] = [];
  userInput: any;

  onInputChange(value: string): void {
    this.answer = value;
    this.filteredOptions = this.auto.frasi.filter(option =>
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


}
