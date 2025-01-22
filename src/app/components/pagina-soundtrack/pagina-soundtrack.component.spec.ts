import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaSoundtrackComponent } from './pagina-soundtrack.component';

describe('PaginaSoundtrackComponent', () => {
  let component: PaginaSoundtrackComponent;
  let fixture: ComponentFixture<PaginaSoundtrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaSoundtrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaSoundtrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
