import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialInfoComponent } from './financial-info.component';

const routes: Routes = [{ path: '', component: FinancialInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialInfoRoutingModule { }
