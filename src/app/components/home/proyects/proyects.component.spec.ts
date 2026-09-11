import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureComponentTest } from 'src/testing/test-setup';

import { ProyectsComponent } from './proyects.component';

describe('ProyectsComponent', () => {
  let component: ProyectsComponent;
  let fixture: ComponentFixture<ProyectsComponent>;

  beforeEach(async () => {
    await configureComponentTest([ProyectsComponent]);

    fixture = TestBed.createComponent(ProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
