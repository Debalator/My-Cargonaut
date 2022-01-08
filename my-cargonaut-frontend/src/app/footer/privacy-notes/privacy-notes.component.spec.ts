import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyNotesComponent } from './privacy-notes.component';

describe('PrivacyNotesComponent', () => {
    let component: PrivacyNotesComponent;
    let fixture: ComponentFixture<PrivacyNotesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PrivacyNotesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PrivacyNotesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
