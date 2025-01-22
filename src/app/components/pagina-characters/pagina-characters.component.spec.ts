import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCharactersComponent } from './pagina-characters.component';

describe('PaginaCharactersComponent', () => {
  let component: PaginaCharactersComponent;
  let fixture: ComponentFixture<PaginaCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaCharactersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
