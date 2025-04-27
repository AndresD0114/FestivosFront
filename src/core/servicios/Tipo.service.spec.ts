import { TestBed } from '@angular/core/testing';

import { TIPOService } from './Tipo.service';

describe('FESTIVOService', () => {
  let service: TIPOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TIPOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
