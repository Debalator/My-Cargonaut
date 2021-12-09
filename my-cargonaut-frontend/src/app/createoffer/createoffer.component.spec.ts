import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateofferComponent } from './createoffer.component';

describe('CreateofferComponent', () => {
  let component: CreateofferComponent;
  let fixture: ComponentFixture<CreateofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateofferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
