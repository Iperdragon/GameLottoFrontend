import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaGlossaryComponent } from './pagina-glossary.component';

describe('PaginaGlossaryComponent', () => {
  let component: PaginaGlossaryComponent;
  let fixture: ComponentFixture<PaginaGlossaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaGlossaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
