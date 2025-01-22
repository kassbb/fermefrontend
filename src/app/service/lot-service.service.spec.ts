import { TestBed } from '@angular/core/testing';

import { LotServiceService } from './lot-service.service';

describe('LotServiceService', () => {
  let service: LotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
