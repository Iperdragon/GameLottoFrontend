import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-homepage',
  imports: [
    RouterLink
  ],
  templateUrl: './homepage.component.html',
  standalone: true,
  styleUrl: './homepage.component.css'
})
export class HomepageComponent
{
  closed:string[]=["https://i.postimg.cc/762NC9xt/CLOSED-SIGN.webp"]
}
