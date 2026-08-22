import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceFormComponent } from './attendance-form';

describe('AttendanceForm', () => {
  let component: AttendanceFormComponent;
  let fixture: ComponentFixture<AttendanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
