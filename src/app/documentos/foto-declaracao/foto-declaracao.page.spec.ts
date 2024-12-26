import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoDeclaracaoPage } from './foto-declaracao.page';

describe('FotoDeclaracaoPage', () => {
  let component: FotoDeclaracaoPage;
  let fixture: ComponentFixture<FotoDeclaracaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoDeclaracaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoDeclaracaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
