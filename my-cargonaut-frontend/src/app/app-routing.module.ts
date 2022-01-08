import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CreateofferComponent } from './createoffer/createoffer.component';
import { CookieNoticeComponent } from './footer/cookie-notice/cookie-notice.component';
import { ImprintComponent } from './footer/imprint/imprint.component';
import { PrivacyNotesComponent } from './footer/privacy-notes/privacy-notes.component';
import { SocialComponent } from './footer/social/social.component';
import { CreaterequestComponent } from "./createrequest/createrequest.component";

const routes: Routes = [
  {
    path: 'createoffer',
    component: CreateofferComponent,
  },
  {
    path: 'createrequest',
    component: CreaterequestComponent,
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
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
