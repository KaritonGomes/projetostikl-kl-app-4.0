import { TestBed } from '@angular/core/testing';

import { ArquivosService } from './arquivos.service';

describe('ArquivosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArquivosService = TestBed.get(ArquivosService);
    expect(service).toBeTruthy();
  });
});
