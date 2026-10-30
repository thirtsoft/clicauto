import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LouerUneVoitureComponent } from './louer-une-voiture-component';

describe('LouerUneVoitureComponent', () => {
  let component: LouerUneVoitureComponent;
  let fixture: ComponentFixture<LouerUneVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LouerUneVoitureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LouerUneVoitureComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
