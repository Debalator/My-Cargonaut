import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarManagementComponent } from './car-management.component';

describe('CarManagementComponent', () => {
<<<<<<< HEAD
    let component: CarManagementComponent;
    let fixture: ComponentFixture<CarManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CarManagementComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CarManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
=======
  let component: CarManagementComponent;
  let fixture: ComponentFixture<CarManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
>>>>>>> 81f6c490483fc084b2ce08b2f0a7acf1712c86b9
});
