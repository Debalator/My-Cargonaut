import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    CreaterequestComponent,
    DialogData,
} from '../createrequest/createrequest.component';

@Component({
    selector: 'app-additem',
    templateUrl: './additem.component.html',
    styleUrls: ['./additem.component.scss'],
})
export class AdditemComponent {
    constructor(
        public dialogRef: MatDialogRef<AdditemComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: DialogData
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
