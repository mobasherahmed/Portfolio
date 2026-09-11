import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureComponentTest } from 'src/testing/test-setup';

import { JobsComponent } from './jobs.component';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;

  beforeEach(async () => {
    await configureComponentTest([JobsComponent]);

    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
