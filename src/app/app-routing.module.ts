import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyComponent } from './modules/currency/currency/currency.component';

const routes: Routes = [
  {
    path: 'currency',
    component: CurrencyComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/currency'
  },
  {
    path: '**',
    component: CurrencyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
