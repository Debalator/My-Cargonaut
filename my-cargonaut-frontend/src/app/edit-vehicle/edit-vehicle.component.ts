import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-edit-vehicle',
    templateUrl: './edit-vehicle.component.html',
    styleUrls: ['./edit-vehicle.component.scss'],
})
export class EditVehicleComponent {
    public car: any = {};

    constructor(
        private snackbar: MatSnackBar,
        public api: ApiService,
        public dialogRef: MatDialogRef<EditVehicleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { car: any }
    ) {}

    ngOnInit(): void {
        this.car = this.data;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    saveCar() {
        const { brand, model, seats, loadingArea } = this.car;

        if (!brand || !model || !seats || !loadingArea)
            this.snackbar.open('Bitte alle Felder ausfüllen!', '', {
                duration: 2000,
            });
        else
            this.api
                .patch(`api/vehicles/${this.car.id}`, this.car)
                .subscribe((res) => {
                    this.dialogRef.close(res);
                });
    }
}
