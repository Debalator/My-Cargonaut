import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    public post(url: string, body: any | null, options?: any): Observable<any> {
        return this.http.post(url, body, {
            ...options,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
            },
        });
    }

    public get(url: string, body: any | null, options?: any): Observable<any> {
        return this.http.post(url, body, {
            ...options,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
            },
        });
    }
}
