import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CreateofferComponent } from './createoffer/createoffer.component';
import { CookieNoticeComponent } from './footer/cookie-notice/cookie-notice.component';
import { ImprintComponent } from './footer/imprint/imprint.component';
import { PrivacyNotesComponent } from './footer/privacy-notes/privacy-notes.component';
import { SocialComponent } from './footer/social/social.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
    {
        path: 'createoffer',
        component: CreateofferComponent,
    },
    {
        path: 'auth',
        component: AuthComponent,
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
        component: LoginPageComponent,
    },
    {
        path: 'register',
        component: RegisterPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
