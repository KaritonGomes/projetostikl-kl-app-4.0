import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaServicosPage } from './agenda-servicos.page';

describe('AgendaServicosPage', () => {
  let component: AgendaServicosPage;
  let fixture: ComponentFixture<AgendaServicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaServicosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaServicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
