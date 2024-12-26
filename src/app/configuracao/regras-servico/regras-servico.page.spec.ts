import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegrasServicoPage } from './regras-servico.page';

describe('RegrasServicoPage', () => {
  let component: RegrasServicoPage;
  let fixture: ComponentFixture<RegrasServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegrasServicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegrasServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
