import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateofferComponent } from './createoffer/createoffer.component';
import { CookieNoticeComponent } from './footer/cookie-notice/cookie-notice.component';
import { ImprintComponent } from './footer/imprint/imprint.component';
import { PrivacyNotesComponent } from './footer/privacy-notes/privacy-notes.component';
import { SocialComponent } from './footer/social/social.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CreaterequestComponent } from './createrequest/createrequest.component';
import { CarManagementComponent } from './car-management/car-management.component';
import { OffersComponent } from './offers/offers.component';
import { RequestsComponent } from './requests/requests.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
    {
        path: 'orders/:id',
        component: OrdersComponent,
    },
    {
        path: 'offers',
        component: OffersComponent,
    },
    {
        path: 'requests',
        component: RequestsComponent,
    },
    {
        path: 'createoffer',
        component: CreateofferComponent,
    },
    {
        path: 'createrequest',
        component: CreaterequestComponent,
    },
    {
        path: 'impressum',
        component: ImprintComponent,
    },
    {
        path: 'social',
        component: SocialComponent,
    },
    {
        path: 'cookies',
        component: CookieNoticeComponent,
    },
    {
        path: 'datenschutz',
        component: PrivacyNotesComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        component: CarManagementComponent,
    },
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'register',
        component: RegisterPageComponent,
    },
    { path: 'cars', component: CarManagementComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
