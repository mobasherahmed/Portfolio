import { TestBed } from '@angular/core/testing';
import { configureComponentTest } from 'src/testing/test-setup';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await configureComponentTest([AppComponent]);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
