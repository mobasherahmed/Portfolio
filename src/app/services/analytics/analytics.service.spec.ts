import { TestBed } from '@angular/core/testing';
import { configureServiceTest } from 'src/testing/test-setup';

import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    configureServiceTest();
    service = TestBed.inject(AnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
