import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceForm } from './performance-form';

describe('PerformanceForm', () => {
  let component: PerformanceForm;
  let fixture: ComponentFixture<PerformanceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PerformanceForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
