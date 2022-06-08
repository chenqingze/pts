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
                canActivate: [AuthGuard]
            },
            {
                path: 'product',
                loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'goods',
                loadChildren: () => import('./pages/goods/goods.module').then(m => m.GoodsModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'logistics',
                loadChildren: () => import('./pages/logistics/logistics.module').then(m => m.LogisticsModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'exchange',
                loadChildren: () => import('./pages/exchange/exchange.module').then(m => m.ExchangeModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'delivery-note',
                loadChildren: () => import('./pages/delivery-note/delivery-note.module').then(m => m.DeliveryNoteModule)
            },
            {
                path: 'financial-info',
                loadChildren: () => import('./pages/financial-info/financial-info.module').then(m => m.FinancialInfoModule)
            },
            {path: 'daq', loadChildren: () => import('./pages/daq/daq.module').then(m => m.DaqModule)},

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
