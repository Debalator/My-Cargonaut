import { Component, OnInit } from '@angular/core';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api/api.service';
import { interval, Subscription, switchMap } from 'rxjs';
import { EditVehicleComponent } from '../edit-vehicle/edit-vehicle.component';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-car-management',
    templateUrl: './car-management.component.html',
    styleUrls: ['./car-management.component.scss'],
})
export class CarManagementComponent implements OnInit {
    cars: any[] = [];

    brand!: string;
    model!: string;
    seats!: number;
    loadingArea!: number;

    constructor(
      private route: ActivatedRoute,
        private dialog: MatDialog,
        private snackbar: MatSnackBar,
        private api: ApiService
    ) {}

    ngOnInit(): void {
        this.renderList();
    }

    addVehicle() {
        const dialogRef = this.dialog.open(AddVehicleComponent, {
            width: '350px',
            data: {
                brand: this.brand,
                model: this.model,
                seats: this.seats,
                loadingArea: this.loadingArea,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log(result);
            if (
                result.brand == null ||
                result.model == null ||
                result.seats == null ||
                result.loadingArea == null
            ) {
                this.snackbar.open(
                    'Alle Felder für den Gegenstand ausfüllen!',
                    '',
                    { duration: 1000 }
                );
            } else {
                console.log(this.cars.values());
                this.api.post('/api/vehicles', {
                    brand: result.brand,
                    model: result.model,
                    seats: result.seats,
                    loadingArea: result.loadingArea,
                });


                this.renderList();
                // window.location.reload();
            }
        });
    }

    editVehicle() {
        const dialogRef = this.dialog.open(EditVehicleComponent, {
            width: '350px',
            data: {
                brand: this.brand,
                model: this.model,
                seats: this.seats,
                loadingArea: this.loadingArea,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(this.cars.values());
            if (result.brand == undefined) result.brand = this.brand;
            if (result.model == undefined) result.model = this.model;
            if (result.seats == undefined) result.seats = this.seats;
            if (result.loadingArea == undefined)
                result.loadingArea = this.loadingArea;
            this.api.patch('/api/vehicles/:id', {
                brand: result.brand,
                model: result.model,
                seats: result.seats,
                loadingArea: result.loadingArea,
            });

            this.renderList();
            window.location.reload();
        });
    }

    deleteVehicle() {
      this.route.params.subscribe( (params) => {
        const carID = +params['id'];
        this.api.delete(`/api/vehicles/${carID}`, {});
        this.renderList();
      })

    }

    renderList() {
        this.api.get('/api/vehicles').subscribe({
            next: (res: any) => {
                console.log(res);
                this.cars = res;
            },
            error: (e: any) => console.error('get vehicles' + e),
            complete: () => console.info('complete'),
        });
    }
}
