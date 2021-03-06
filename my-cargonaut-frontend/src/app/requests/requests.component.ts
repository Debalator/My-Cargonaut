import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { OrderRequestComponent } from '../order-request/order-request.component';
import { LoginServiceService } from '../login-page/login-service.service';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
    requests: any[] = [];
    isLoading = true;

    constructor(
        private api: ApiService,
        public dialog: MatDialog,
        private router: Router,
        public loginService: LoginServiceService
    ) {}

    isLoggedIn(): Observable<boolean> {
        return this.loginService.jwtValue.pipe(
            map((value: string) => {
                return value != '';
            })
        );
    }

    ngOnInit(): void {
        this.api.get('/api/requests').subscribe((res) => {
            console.log(res);
            this.requests = res;
            this.isLoading = false;
        });
    }

    openDialog(requestID: number) {
        const dialogRef = this.dialog.open(OrderRequestComponent, {
            data: {
                request: this.requests.find(
                    (request) => request.id === requestID
                ),
            },
        });

        dialogRef.afterClosed().subscribe((order) => {
            if (order) this.router.navigate(['/orders', order.id]);
        });
    }
}
