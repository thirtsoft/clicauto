import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutAutoComponent } from './main-layout-auto-component';

describe('MainLayoutAutoComponent', () => {
  let component: MainLayoutAutoComponent;
  let fixture: ComponentFixture<MainLayoutAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutAutoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutAutoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
