import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ConstructorStamps9Component } from './constructor-stamps9.component';

const routes: Routes = [
  {
    path: '',
    component: ConstructorStamps9Component
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConstructorStamps9RoutingModule { }
