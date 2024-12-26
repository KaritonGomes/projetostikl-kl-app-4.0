import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoResidenciaPage } from './foto-residencia.page';

describe('FotoResidenciaPage', () => {
  let component: FotoResidenciaPage;
  let fixture: ComponentFixture<FotoResidenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoResidenciaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoResidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
