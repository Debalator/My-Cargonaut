import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreateofferComponent } from './createoffer/createoffer.component';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
    ErrorStateMatcher,
    MatNativeDateModule,
    ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from './footer/footer.component';
import { SocialComponent } from './footer/social/social.component';
import { ImprintComponent } from './footer/imprint/imprint.component';
import { PrivacyNotesComponent } from './footer/privacy-notes/privacy-notes.component';
import { CookieNoticeComponent } from './footer/cookie-notice/cookie-notice.component';
import { CreaterequestComponent } from './createrequest/createrequest.component';
import { MatGridListModule } from "@angular/material/grid-list";
import { AdditemComponent } from './additem/additem.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
    declarations: [
        AppComponent,
        CreateofferComponent,
        AuthComponent,
        FooterComponent,
        SocialComponent,
        ImprintComponent,
        PrivacyNotesComponent,
        CookieNoticeComponent,
        CreaterequestComponent,
        AdditemComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NoopAnimationsModule,
        MatInputModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatGridListModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        FlexLayoutModule,
        ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
