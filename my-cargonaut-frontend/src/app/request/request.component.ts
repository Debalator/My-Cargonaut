import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
    @Input() request: any;

    constructor() {}

    ngOnInit(): void {}
}
