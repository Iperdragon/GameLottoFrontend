import { TestBed } from '@angular/core/testing';

import { AutofillerService } from './autofiller.service';

describe('AutofillerService', () => {
  let service: AutofillerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutofillerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
