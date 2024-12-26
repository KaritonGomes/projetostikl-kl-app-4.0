import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacaoPage } from './locacao.page';

describe('LocacaoPage', () => {
  let component: LocacaoPage;
  let fixture: ComponentFixture<LocacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
