import { Component, OnInit } from '@angular/core';
import { AddVehicleComponent } from "../add-vehicle/add-vehicle.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "../api/api.service";
import { interval, Subscription, switchMap } from "rxjs";

export interface Car {
  brand: string;
  model: string;
  seats: number;
  loadingArea: number;
}


@Component({
  selector: 'app-car-management',
  templateUrl: './car-management.component.html',
  styleUrls: ['./car-management.component.scss']
})
export class CarManagementComponent implements OnInit {

  cars: Car[] = [{ brand: 'Audi', model: 'Q7', seats: 3, loadingArea: 20 },
    {brand: 'Seat', model: 'Ibiza', seats: 2, loadingArea: 5}];

  brand!: string;
  model!: string;
  seats!: number;
  loadingArea!: number;

  constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private api: ApiService) { }

  ngOnInit(): void {
    // this.renderList();
    // this.updateVehiclesEverySecond();
  }

  addVehicle(){
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
        this.cars.push({
          brand: result.brand,
          model: result.model,
          seats: result.seats,
          loadingArea: result.loadingArea,
        });
      }
    });
  }

  timeInterval!: Subscription;

  private updateVehiclesEverySecond() {
    this.timeInterval = interval(1000).pipe(
      switchMap(() => this.api.get('/api/vehicles')),
    ).subscribe({
      next: (res: any) => {
        // this.dataSource.data = res;
        this.cars = res;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  // dataSource = new MatTableDataSource(this.cars);

  renderList(){
    this.api.get('/api/vehicles').subscribe({
      next: (res: any) => {
        // this.dataSource.data = res;
        this.cars = res;
      },
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
    });
  }

}
