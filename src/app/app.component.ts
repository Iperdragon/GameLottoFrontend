import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {PaginaGlossaryComponent} from './components/pagina-glossary/pagina-glossary.component';
import {PaginaCoverComponent} from './components/pagina-cover/pagina-cover.component';
import {RoundLoaderService} from './services/round-loader.service';
import {AutofillerService} from './services/autofiller.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, RouterLink, PaginaGlossaryComponent, PaginaCoverComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'GameLottoFrontend';

  animationDuration: number = 2000;
  animationInterval: number = 15000;
  private animatedElement!: HTMLElement;
  private intervalId: any;

  constructor(
    private loader: RoundLoaderService,
    private auto:AutofillerService,
    private renderer: Renderer2,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit():void{
    this.animatedElement = this.el.nativeElement.querySelector('#animated-container')!;
    this.setIdleState();
    this.startIntervalAnimation(); // Avvia l'animazione a intervalli
  }

  ngOnDestroy():void{
    clearInterval(this.intervalId); // Pulisci l'intervallo quando il componente viene distrutto
  }

  startIntervalAnimation(): void {
    this.intervalId = setInterval(() =>{
      this.startAnimation();
    }, this.animationInterval);
  }

  startAnimation(): void {
    this.renderer.addClass(this.animatedElement, 'active');
    this.renderer.removeClass(this.animatedElement, 'idle'
    );

    setTimeout(() => {
      this.setIdleState();
    }, this.animationDuration);
  }

  private setIdleState(): void {
    this.renderer.addClass(this.animatedElement, 'idle');
    this.renderer.removeClass(this.animatedElement, 'active'
    );
  }

}

