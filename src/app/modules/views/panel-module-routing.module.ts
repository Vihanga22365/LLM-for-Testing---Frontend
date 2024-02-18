import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponentComponent } from './panel-view/dashboard-component/dashboard-component.component';
import { CalanderComponentComponent } from './panel-view/calander-component/calander-component.component';
import { TimelineComponentComponent } from './panel-view/timeline-component/timeline-component.component';
import { NavBarComponentComponent } from '../shared/panel-view/nav-bar-component/nav-bar-component.component';

const routes: Routes = [
  {
    path: '',
    component: NavBarComponentComponent,
    children: [
      { path: '', redirectTo: '/panel/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponentComponent },
      { path: 'timeline', component: TimelineComponentComponent },
      { path: 'calendar', component: CalanderComponentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelModuleRoutingModule {}
