import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'results',
        loadChildren: () => import('../results/results.module').then(m => m.ResultsPageModule)
      },
      {
        path: 'classification',
        loadChildren: () => import('../classification/classification.module').then( m => m.ClassificationPageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarPageModule)
      },
      {
        path: 'stats',
        loadChildren: () => import('../stats/stats.module').then(m => m.StatsPageModule)
      },
      {
        path: '',
        redirectTo: '/results',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/results',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
