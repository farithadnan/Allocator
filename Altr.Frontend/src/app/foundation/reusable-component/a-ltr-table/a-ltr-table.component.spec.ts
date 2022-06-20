import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ALtrTableComponent } from './a-ltr-table.component';

describe('ALtrTableComponent', () => {
  let component: ALtrTableComponent;
  let fixture: ComponentFixture<ALtrTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ALtrTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ALtrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
