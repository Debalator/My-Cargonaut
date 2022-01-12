import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-add-vehicle',
    templateUrl: './add-vehicle.component.html',
    styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent {
    public car: any = {
        brand: '',
        model: '',
        seats: 0,
        loadingArea: 0,
    };

    constructor(
        public api: ApiService,
        public dialogRef: MatDialogRef<AddVehicleComponent>,
        private snackbar: MatSnackBar
    ) {}

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
            this.api.post('/api/vehicles', this.car).subscribe((order) => {
                this.dialogRef.close(order);
            });
    }
}
