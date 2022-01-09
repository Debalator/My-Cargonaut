import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

describe('ApiService', () => {
    let service: ApiService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
        TestBed.configureTestingModule({});
        //service = TestBed.inject(ApiService);
        service = new ApiService(httpClientSpy);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
