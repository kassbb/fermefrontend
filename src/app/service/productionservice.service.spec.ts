import { TestBed } from '@angular/core/testing';

import { ProductionserviceService } from './productionservice.service';

describe('ProductionserviceService', () => {
  let service: ProductionserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
