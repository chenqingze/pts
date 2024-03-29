import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: '/welcome'},
      {
        path: 'welcome',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '**', pathMatch: 'full', redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
