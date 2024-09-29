import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('@components/tasks-container/task-container.component').then(c => c.TaskContainerComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('@components/task-form/task-form.component').then(c => c.TaskFormComponent)
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
