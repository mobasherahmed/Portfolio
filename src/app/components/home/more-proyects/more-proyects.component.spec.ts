import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureComponentTest } from 'src/testing/test-setup';

import { MoreProyectsComponent } from './more-proyects.component';

describe('MoreProyectsComponent', () => {
  let component: MoreProyectsComponent;
  let fixture: ComponentFixture<MoreProyectsComponent>;

  beforeEach(async () => {
    await configureComponentTest([MoreProyectsComponent]);

    fixture = TestBed.createComponent(MoreProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
