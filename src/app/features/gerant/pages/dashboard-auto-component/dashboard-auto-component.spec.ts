import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAutoComponent } from './dashboard-auto-component';

describe('DashboardAutoComponent', () => {
  let component: DashboardAutoComponent;
  let fixture: ComponentFixture<DashboardAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAutoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAutoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
