import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';

import { ALtrTableComponent } from './a-ltr-table.component';

describe('ALtrTableComponent', () => {
  let component: ALtrTableComponent;
  let fixture: ComponentFixture<ALtrTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMenuModule],
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
