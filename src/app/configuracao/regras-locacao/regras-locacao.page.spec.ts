import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegrasLocacaoPage } from './regras-locacao.page';

describe('RegrasLocacaoPage', () => {
  let component: RegrasLocacaoPage;
  let fixture: ComponentFixture<RegrasLocacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegrasLocacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegrasLocacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
