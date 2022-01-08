import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CreaterequestComponent, DialogData } from "../createrequest/createrequest.component";

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})


export class AdditemComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdditemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData /*, public request: CreaterequestComponent */) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
