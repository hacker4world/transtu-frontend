import { TestBed } from '@angular/core/testing';

import { DefaillanceService } from './defaillance.service';

describe('DefaillanceService', () => {
  let service: DefaillanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaillanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
