import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelidadeExternoPage } from './fidelidade-externo.page';

describe('FidelidadeExternoPage', () => {
  let component: FidelidadeExternoPage;
  let fixture: ComponentFixture<FidelidadeExternoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FidelidadeExternoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FidelidadeExternoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
