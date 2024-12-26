import { TestBed } from '@angular/core/testing';

import { RegrasService } from './regras.service';

describe('RegrasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegrasService = TestBed.get(RegrasService);
    expect(service).toBeTruthy();
  });
});
