import { TestBed } from '@angular/core/testing';

import { UsergroupeService } from './usergroupe.service';

describe('UsergroupeService', () => {
  let service: UsergroupeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsergroupeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
