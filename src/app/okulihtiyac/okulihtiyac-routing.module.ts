import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OkulihtiyacPage } from './okulihtiyac.page';

const routes: Routes = [
  {
    path: '',
    component: OkulihtiyacPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OkulihtiyacPageRoutingModule {}
