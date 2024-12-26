import { TestBed } from '@angular/core/testing';

import { AmortizacaoService } from './amortizacao.service';

describe('AmortizacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmortizacaoService = TestBed.get(AmortizacaoService);
    expect(service).toBeTruthy();
  });
});
