import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DualPage } from './dual.page';

describe('DualPage', () => {
  let component: DualPage;
  let fixture: ComponentFixture<DualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DualPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
