import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegrasServicoExternoPage } from './regras-servico-externo.page';

describe('RegrasServicoExternoPage', () => {
  let component: RegrasServicoExternoPage;
  let fixture: ComponentFixture<RegrasServicoExternoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegrasServicoExternoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegrasServicoExternoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
