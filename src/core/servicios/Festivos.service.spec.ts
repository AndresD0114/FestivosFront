import { TestBed } from '@angular/core/testing';

import { FESTIVOService } from './Festivos.service';

describe('FESTIVOService', () => {
  let service: FESTIVOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FESTIVOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
