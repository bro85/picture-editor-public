import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ConstructorStamps6Component } from './constructor-stamps6.component';

const routes: Routes = [
  {
    path: '',
    component: ConstructorStamps6Component
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConstructorStamps6RoutingModule { }
