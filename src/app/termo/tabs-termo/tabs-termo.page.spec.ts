import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsTermoPage } from './tabs-termo.page';

describe('TabsTermoPage', () => {
  let component: TabsTermoPage;
  let fixture: ComponentFixture<TabsTermoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsTermoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsTermoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
