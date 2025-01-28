import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouterLink} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-howtoplay',
  imports: [],
  templateUrl: './howtoplay.component.html',
  standalone: true,
  styleUrl: './howtoplay.component.css',
  animations: [
    trigger('slideToggle', [
      state('false', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden',
        padding: '0',
      })),
      state('true', style({
        height: '*',
        opacity: 1,
        padding: '10px',
      })),
      transition('false <=> true', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HowtoplayComponent {
  isSectionVisible: { [key in 'section1' | 'section2']: boolean } = {
    section1: false,
    section2: false,
  };

  toggleText(section: 'section1' | 'section2'): void {
    this.isSectionVisible[section] = !this.isSectionVisible[section];
  }
}
