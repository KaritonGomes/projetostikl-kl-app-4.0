import { TestBed } from '@angular/core/testing';

import { LojasService } from './lojas.service';

describe('LojasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LojasService = TestBed.get(LojasService);
    expect(service).toBeTruthy();
  });
});
