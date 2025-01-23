import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {PaginaGlossaryComponent} from './components/pagina-glossary/pagina-glossary.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, RouterLink, PaginaGlossaryComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GameLottoFrontend';
}
