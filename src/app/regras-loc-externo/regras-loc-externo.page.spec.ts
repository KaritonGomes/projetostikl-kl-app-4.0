import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegrasLocExternoPage } from './regras-loc-externo.page';

describe('RegrasLocExternoPage', () => {
  let component: RegrasLocExternoPage;
  let fixture: ComponentFixture<RegrasLocExternoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegrasLocExternoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegrasLocExternoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
