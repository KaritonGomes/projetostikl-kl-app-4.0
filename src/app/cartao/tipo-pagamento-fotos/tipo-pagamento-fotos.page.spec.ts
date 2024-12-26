import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPagamentoFotosPage } from './tipo-pagamento-fotos.page';

describe('TipoPagamentoFotosPage', () => {
  let component: TipoPagamentoFotosPage;
  let fixture: ComponentFixture<TipoPagamentoFotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPagamentoFotosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPagamentoFotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
