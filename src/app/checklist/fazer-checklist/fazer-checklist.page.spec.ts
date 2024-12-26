import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FazerChecklistPage } from './fazer-checklist.page';

describe('FazerChecklistPage', () => {
  let component: FazerChecklistPage;
  let fixture: ComponentFixture<FazerChecklistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FazerChecklistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FazerChecklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
