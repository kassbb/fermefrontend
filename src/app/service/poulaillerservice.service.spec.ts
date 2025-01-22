import { TestBed } from '@angular/core/testing';

import { PoulaillerserviceService } from './poulaillerservice.service';

describe('PoulaillerserviceService', () => {
  let service: PoulaillerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoulaillerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
