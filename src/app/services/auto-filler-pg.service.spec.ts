import { TestBed } from '@angular/core/testing';

import { AutoFillerPgService } from './auto-filler-pg.service';

describe('AutoFillerPgService', () => {
  let service: AutoFillerPgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoFillerPgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
