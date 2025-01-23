import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {PaginaCoverComponent} from './components/pagina-cover/pagina-cover.component';
import {PaginaGlossaryComponent} from './components/pagina-glossary/pagina-glossary.component';

export const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:'',component:HomepageComponent},
  {path: 'cover',component:PaginaCoverComponent},
  {path: 'glossary',component:PaginaGlossaryComponent}

];
