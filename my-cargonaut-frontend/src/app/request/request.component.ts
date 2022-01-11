import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss'],
})
export class RequestComponent {
    @Input() request: any;
}
