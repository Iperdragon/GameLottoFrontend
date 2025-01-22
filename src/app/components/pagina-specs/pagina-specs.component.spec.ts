import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaSpecsComponent } from './pagina-specs.component';

describe('PaginaSpecsComponent', () => {
  let component: PaginaSpecsComponent;
  let fixture: ComponentFixture<PaginaSpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaSpecsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
