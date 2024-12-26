import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogarPage } from './page-logar.page';

describe('PageLogarPage', () => {
  let component: PageLogarPage;
  let fixture: ComponentFixture<PageLogarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLogarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
