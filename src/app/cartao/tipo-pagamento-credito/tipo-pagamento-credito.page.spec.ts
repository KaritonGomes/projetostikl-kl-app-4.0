import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPagamentoCreditoPage } from './tipo-pagamento-credito.page';

describe('TipoPagamentoCreditoPage', () => {
  let component: TipoPagamentoCreditoPage;
  let fixture: ComponentFixture<TipoPagamentoCreditoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPagamentoCreditoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPagamentoCreditoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
