import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePictureUploadDialogComponent } from './profile-picture-upload-dialog.component';

describe('ProfilePictureUploadDialogComponent', () => {
  let component: ProfilePictureUploadDialogComponent;
  let fixture: ComponentFixture<ProfilePictureUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePictureUploadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePictureUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
