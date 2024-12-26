import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguroExternoPage } from './seguro-externo.page';

describe('SeguroExternoPage', () => {
  let component: SeguroExternoPage;
  let fixture: ComponentFixture<SeguroExternoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguroExternoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguroExternoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
