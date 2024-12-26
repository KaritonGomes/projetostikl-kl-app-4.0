import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersaoAppPage } from './versao-app.page';

describe('VersaoAppPage', () => {
  let component: VersaoAppPage;
  let fixture: ComponentFixture<VersaoAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersaoAppPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersaoAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
