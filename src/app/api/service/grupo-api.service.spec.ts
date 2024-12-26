import { TestBed } from '@angular/core/testing';

import { GrupoApiService } from './grupo-api.service';

describe('GrupoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrupoApiService = TestBed.get(GrupoApiService);
    expect(service).toBeTruthy();
  });
});
