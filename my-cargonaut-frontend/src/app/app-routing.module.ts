import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateofferComponent } from './createoffer/createoffer.component';

const routes: Routes = [
  {
    path: "create_offer",
    component: CreateofferComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
