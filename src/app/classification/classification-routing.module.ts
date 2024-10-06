import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassificationPage } from './classification.page';

const routes: Routes = [
  {
    path: '',
    component: ClassificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassificationPageRoutingModule {}
