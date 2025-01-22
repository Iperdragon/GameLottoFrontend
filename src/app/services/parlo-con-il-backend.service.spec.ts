import { TestBed } from '@angular/core/testing';

import { ParloConIlBackend } from './parlo-con-il-backend.service';

describe('ParloConIlBackend', () => {
  let service: ParloConIlBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParloConIlBackend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
