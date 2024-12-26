import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTermoPage } from './lista-termo.page';

describe('ListaTermoPage', () => {
  let component: ListaTermoPage;
  let fixture: ComponentFixture<ListaTermoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTermoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTermoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
