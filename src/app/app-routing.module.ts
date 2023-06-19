import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule)
  },
  {
    path: 'constructor-envelope-c6',
    loadChildren: () => import('./pages/constructor-envelope-c6/constructor-envelope-c6.module').then(m => m.ConstructorEnvelopeC6Module)
  },
  {
    path: 'constructor-envelope-dl',
    loadChildren: () => import('./pages/constructor-envelope-dl/constructor-envelope-dl.module').then(m => m.ConstructorEnvelopeDlModule)
  },
  {
    path: 'constructor-postcard',
    loadChildren: () => import('./pages/constructor-postcard/constructor-postcard.module').then(m => m.ConstructorPostcardModule)
  },
  {
    path: 'constructor-stamps-6',
    loadChildren: () => import('./pages/constructor-stamps6/constructor-stamps6.module').then(m => m.ConstructorStamps6Module)
  },
  {
    path: 'constructor-stamps-9',
    loadChildren: () => import('./pages/constructor-stamps9/constructor-stamps9.module').then(m => m.ConstructorStamps9Module)
  },
  {
    path: 'constructor-stamps-28',
    loadChildren: () => import('./pages/constructor-stamps28/constructor-stamps28.module').then(m => m.ConstructorStamps28Module)
  },
  {
    path: 'constructor-stamps-28-difference',
    loadChildren: () => import('./pages/constructor-stamps28-difference/constructor-stamps28-difference.module').then(m => m.ConstructorStamps28DifferenceModule)
  },
  {
    path: 'delivery-clearance',
    loadChildren: () => import('./pages/delivery-clearance/delivery-clearance.module').then(m => m.DeliveryClearanceModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/error-page/error-page.module').then(m => m.ErrorPageModule)
  },
  {
    path: '**',
    redirectTo: '/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
