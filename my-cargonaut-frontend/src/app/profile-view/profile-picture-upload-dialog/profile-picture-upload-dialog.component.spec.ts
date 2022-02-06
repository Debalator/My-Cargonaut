import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';

import { ProfilePictureUploadDialogComponent } from './profile-picture-upload-dialog.component';

describe('ProfilePictureUploadDialogComponent', () => {
    let component: ProfilePictureUploadDialogComponent;
    let fixture: ComponentFixture<ProfilePictureUploadDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfilePictureUploadDialogComponent],
            providers: [
                {
                    provide: ApiService,
                    useValue: apiServiceStub,
                },
            ],
        }).compileComponents();
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

const apiServiceStub = {
    post(url: string, body: any | null, options?: any) {
        return of(url);
    },
    delete(url: string, body: any | null, options?: any) {
        return of(url);
    },
    put(url: string, body: any | null, options?: any) {
        return of(url);
    },
    get(url: string, options?: any) {
        return of([url]);
    },
};
