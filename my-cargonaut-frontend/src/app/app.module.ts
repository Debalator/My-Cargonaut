import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { ListItemComponent } from './list-item/list-item.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SocialComponent } from './footer/social/social.component';
import { ImprintComponent } from './footer/imprint/imprint.component';
import { PrivacyNotesComponent } from './footer/privacy-notes/privacy-notes.component';
import { CookieNoticeComponent } from './footer/cookie-notice/cookie-notice.component';
import { CreaterequestComponent } from './createrequest/createrequest.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AdditemComponent } from './additem/additem.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

import { OffersComponent } from './offers/offers.component';
import { OrderOfferComponent } from './order-offer/order-offer.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { RequestItemsComponent } from './request-items/request-items.component';
import { RequestsComponent } from './requests/requests.component';
import { OrderRequestComponent } from './order-request/order-request.component';
import { CarManagementComponent } from './car-management/car-management.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        RegisterPageComponent,
        CreateofferComponent,
        ListItemComponent,
        ProfileViewComponent,
        HomepageComponent,
        FooterComponent,
        SocialComponent,
        ImprintComponent,
        PrivacyNotesComponent,
        CookieNoticeComponent,
        CreaterequestComponent,
        AdditemComponent,
        CarManagementComponent,
        AddVehicleComponent,
        OffersComponent,
        OrderOfferComponent,
        VehiclesComponent,
        RequestItemsComponent,
        RequestsComponent,
        OrderRequestComponent,
        EditVehicleComponent,
        OrdersComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
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
        MatCardModule,
        MatGridListModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatListModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
