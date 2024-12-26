import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulamentoDepositoPage } from './regulamento-deposito.page';

describe('RegulamentoDepositoPage', () => {
  let component: RegulamentoDepositoPage;
  let fixture: ComponentFixture<RegulamentoDepositoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulamentoDepositoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulamentoDepositoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
