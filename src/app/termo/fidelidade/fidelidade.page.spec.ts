import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelidadePage } from './fidelidade.page';

describe('FidelidadePage', () => {
  let component: FidelidadePage;
  let fixture: ComponentFixture<FidelidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FidelidadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FidelidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
