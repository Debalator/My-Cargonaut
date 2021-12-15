import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CreateofferComponent } from './createoffer/createoffer.component';

const routes: Routes = [
  {
    path: "create_offer",
    component: CreateofferComponent
  },
  {
    path: "auth",
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
