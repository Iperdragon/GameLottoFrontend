import { TestBed } from '@angular/core/testing';

import { RoundLoaderService } from './round-loader.service';

describe('RoundLoaderService', () => {
  let service: RoundLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
