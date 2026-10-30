import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarAutoComponent } from './side-bar-auto-component';

describe('SideBarAutoComponent', () => {
  let component: SideBarAutoComponent;
  let fixture: ComponentFixture<SideBarAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarAutoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarAutoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
