import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoVeiculoExternoPage } from './grupo-veiculo-externo.page';

describe('GrupoVeiculoExternoPage', () => {
  let component: GrupoVeiculoExternoPage;
  let fixture: ComponentFixture<GrupoVeiculoExternoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoVeiculoExternoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoVeiculoExternoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
