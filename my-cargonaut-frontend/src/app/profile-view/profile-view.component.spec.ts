import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { from, of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { LoginServiceService } from '../login-page/login-service.service';

import { ProfileViewComponent } from './profile-view.component';

describe('ProfileViewComponent', () => {
    let component: ProfileViewComponent;
    let fixture: ComponentFixture<ProfileViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileViewComponent],
            imports: [MatDialogModule],
            providers: [
                {
                    provide: ApiService,
                    useValue: apiServiceStub,
                },
                {
                    provide: LoginServiceService,
                    useValue: loginServiceStub,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileViewComponent);
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
        if (url === '/api/profile') {
            return of({
                profilePicturePath: '',
                username: '',
                mail: '',
            } as any);
        }

        return of([]);
    },
};

const loginServiceStub = {
    id: '',
};
