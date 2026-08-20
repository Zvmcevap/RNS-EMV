import { TestBed } from '@angular/core/testing';

import { Performance } from './performance';

describe('Performance', () => {
  let service: Performance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Performance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
