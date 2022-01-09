import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditemComponent } from './additem.component';

describe('AdditemComponent', () => {
  let component: AdditemComponent;
  let fixture: ComponentFixture<AdditemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
