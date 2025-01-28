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
  hearts: string[] = Array(1).fill('https://i.postimg.cc/KjHzc8yt/HEART1.png'); // Percorso immagine cuore pieno
  mostraReStart: boolean = false;
  mostraProssimo: boolean = false;
  maxStep:number=1;
  step:number=0;
  idsUsed:number[]=[];
  sound:VideogameDTORespSound|null=null;
  answer:string="";
  wrongAnswers:string[]=[];
  allAnswers:string[]=[];
  imgPlay:string[]=["https://i.postimg.cc/KYByv5yQ/Pulsante-PLAY.webp", "https://i.postimg.cc/Z51SSMXC/Pulsante-PLAY-Active.webp"]
  imgStop:string[]=["https://i.postimg.cc/VLZw76R9/Pulsante-STOP.webp", "https://i.postimg.cc/L68RBfz6/Pulsante-STOP-Active.webp"]
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
        this.wrongAnswers=this.auto.getThreeRandom(this.sound.name);
        console.log(this.wrongAnswers);
        this.allAnswers=[...this.wrongAnswers, this.sound.name].sort(() => Math.random() - 0.5);
        this.errorMessage=null;
        this.mostraProssimo = false;
        this.stopAudio();
        this.hearts=Array(1).fill('https://i.postimg.cc/KjHzc8yt/HEART1.png')
      }
    )
  }

  controllaRisposta3(ans:string)
  {
    if(this.sound!.name==ans)
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
    alert('Game Over! ' + '\n'+
          'Il gioco è: '+this.sound?.name);
    this.stopAudio();
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
        this.audio.volume=0.2;
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
