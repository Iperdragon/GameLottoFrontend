import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCoverComponent } from './pagina-cover.component';

describe('PaginaCoverComponent', () => {
  let component: PaginaCoverComponent;
  let fixture: ComponentFixture<PaginaCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaCoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
