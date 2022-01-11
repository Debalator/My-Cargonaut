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

    public get(url: string, options?: any): Observable<any> {
        return this.http.get(url, {
            ...options,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
            },
        });
    }

    public patch(
        url: string,
        body: any | null,
        options?: any
    ): Observable<any> {
        return this.http.patch(url, body, {
            ...options,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
            },
        });
    }

    public put(url: string, body: any | null, options?: any): Observable<any> {
        return this.http.put(url, body, {
            ...options,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
            },
        });
    }

    public delete(url: string, options?: any): Observable<any> {
        return this.http.delete(url, {
            ...options,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
            },
        });
    }
}
