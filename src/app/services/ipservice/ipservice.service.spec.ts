import { TestBed } from '@angular/core/testing';
import { configureServiceTest } from 'src/testing/test-setup';

import { IpserviceService } from './ipservice.service';

describe('IpserviceService', () => {
  let service: IpserviceService;

  beforeEach(() => {
    configureServiceTest();
    service = TestBed.inject(IpserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
