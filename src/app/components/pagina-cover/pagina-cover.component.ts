import {Component, ElementRef, Renderer2} from '@angular/core';
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
export class PaginaCoverComponent {

  maxStep:number=6;
  step:number=0;
  idsUsed:number[]=[];
  videogame:VideogameDTORespCover|null=null;
  answer:string="";

  constructor(
    private loader: RoundLoaderService,
    private auto:AutofillerService,
    private renderer: Renderer2,
    private el: ElementRef
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
        this.updateBlur();
      }
      else
      {
        this.terminaGame();
      }
    }
  }

  private terminaGame(): void {
    alert('Game Over!');
  }

  private updateBlur(): void {
    // Calcola il nuovo livello di blur in base allo step
    const maxBlur = 10;
    const blurAmount = maxBlur - (this.step / this.maxStep) * maxBlur;
    this.setBlur(blurAmount);
  }

  private setBlur(blurAmount: number): void {
    const imgElement = this.el.nativeElement.querySelector('#img2');
    if (imgElement) {
      this.renderer.setStyle(imgElement, 'filter', `blur(${blurAmount}px)`);
    }
  }

  filteredOptions: string[] = [];

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
}
