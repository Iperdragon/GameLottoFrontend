import { Component } from '@angular/core';
import {VideogameDTORespSound} from '../../model/VideogameDTORespSound';
import {RoundLoaderService} from '../../services/round-loader.service';
import {HttpClient} from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutofillerService} from '../../services/autofiller.service';

@Component({
  selector: 'app-pagina-soundtrack',
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './pagina-soundtrack.component.html',
  standalone: true,
  styleUrl: './pagina-soundtrack.component.css'
})
export class PaginaSoundtrackComponent
{
  hearts: string[] = Array(5).fill('https://i.postimg.cc/KjHzc8yt/HEART1.png'); // Percorso immagine cuore pieno
  mostraReStart: boolean = false;
  mostraProssimo: boolean = false;
  maxStep:number=5;
  step:number=0;
  idsUsed:number[]=[];
  sound:VideogameDTORespSound|null=null;
  answer:string="";

  constructor(private loader:RoundLoaderService,
              private http:HttpClient,
              private auto:AutofillerService)
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
        this.errorMessage=null;
        this.mostraProssimo = false;
        this.hearts=Array(5).fill('https://i.postimg.cc/KjHzc8yt/HEART1.png')
      }
    )
  }

  controllaRisposta3()
  {
    if(this.sound!.name==this.answer)
    {
      this.idsUsed.push(this.sound!.id!);
      this.mostraProssimo = true;
      this.answer="";
    }
    else
    {
      if(this.step<this.maxStep-1)
      {
        this.hearts[this.step] = 'https://i.postimg.cc/MZPXmdjX/HEART2.png'
        this.answer="";
        this.step++;
      }
      else
      {
        this.hearts[this.step] = 'https://i.postimg.cc/MZPXmdjX/HEART2.png'
        this.answer="";
        this.terminaGame3();
      }
    }
  }

  private terminaGame3(): void {
    alert('Game Over!');
    this.mostraReStart = true;
  }

  restartGame3(): void {
    this.idsUsed = [];
    this.step=0;
    this.mostraReStart=false;
    this.answer="";
    this.caricaRound2();
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

  audio: HTMLAudioElement = new Audio();
  isPlaying: boolean = false;
  errorMessage: string | null = null;



  playAudio(): void {
    const url = `/api/audio/${this.sound?.soundtrack}`;

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const audioUrl = window.URL.createObjectURL(blob);
        this.audio.src = audioUrl;
        this.audio.load();
        this.audio.play();
        this.isPlaying = true;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = `Errore nel caricamento del file audio: ${error.statusText}`;
        this.isPlaying = false;
      }
    });
  }

  stopAudio(): void {
    if (this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }
}
