import { TestBed } from '@angular/core/testing';

import { NomeDaScegliereService } from './nome-da-scegliere.service';

describe('NomeDaScegliereService', () => {
  let service: NomeDaScegliereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomeDaScegliereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
