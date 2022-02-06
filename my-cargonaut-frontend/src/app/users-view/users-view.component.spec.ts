import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiService } from '../api/api.service';

import { UsersViewComponent } from './users-view.component';

describe('UsersViewComponent', () => {
    let component: UsersViewComponent;
    let fixture: ComponentFixture<UsersViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UsersViewComponent],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: ApiService,
                    useValue: apiServiceStub,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersViewComponent);
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
        if (url.includes('ratings')) {
            return of([]);
        }

        return of({
            username: '',
        } as any);
    },
};
