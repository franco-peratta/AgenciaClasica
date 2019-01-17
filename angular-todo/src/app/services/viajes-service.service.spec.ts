import { TestBed } from '@angular/core/testing';

import { ViajesServiceService } from './viajes-service.service';

describe('ViajesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViajesServiceService = TestBed.get(ViajesServiceService);
    expect(service).toBeTruthy();
  });
});
