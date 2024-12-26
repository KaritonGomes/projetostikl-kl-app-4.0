import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPagamentosPage } from './lista-pagamentos.page';

describe('ListaPagamentosPage', () => {
  let component: ListaPagamentosPage;
  let fixture: ComponentFixture<ListaPagamentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPagamentosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPagamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
