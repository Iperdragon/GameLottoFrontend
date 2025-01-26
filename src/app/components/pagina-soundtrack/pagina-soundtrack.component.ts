import { Component } from '@angular/core';
import {VideogameDTORespSound} from '../../model/VideogameDTORespSound';
import {RoundLoaderService} from '../../services/round-loader.service';
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-pagina-soundtrack',
  imports: [
    NgIf
  ],
  templateUrl: './pagina-soundtrack.component.html',
  standalone: true,
  styleUrl: './pagina-soundtrack.component.css'
})
export class PaginaSoundtrackComponent
{
  step:number=0;
  idsUsed:number[]=[];
  sound:VideogameDTORespSound|null=null;

  constructor(private loader:RoundLoaderService, private http:HttpClient)
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
