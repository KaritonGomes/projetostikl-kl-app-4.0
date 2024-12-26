import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaRevisePage } from './rota-revise.page';

describe('RotaRevisePage', () => {
  let component: RotaRevisePage;
  let fixture: ComponentFixture<RotaRevisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotaRevisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaRevisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
