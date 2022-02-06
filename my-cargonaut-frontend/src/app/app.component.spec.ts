import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ApiService } from './api/api.service';
import { AppComponent } from './app.component';
import { LoginServiceService } from './login-page/login-service.service';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
            providers: [
                {
                    provide: ApiService,
                    useValue: apiServiceStub,
                },
                {
                    provide: LoginServiceService,
                },
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'MyCargonaut'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('MyCargonaut');
    });
});

const apiServiceStub = {
    get(url: string, options?: any) {
        return of(url);
    },
};

const loginServiceStub = {
    jwtValue: new BehaviorSubject<string>(''),
    clear() {},
};
