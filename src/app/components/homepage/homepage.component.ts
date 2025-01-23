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
export class HomepageComponent {

}
