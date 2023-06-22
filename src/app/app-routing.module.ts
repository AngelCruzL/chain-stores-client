import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        m => m.DashboardModule,
      ),
  },
  {
    path: 'admin',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () =>
      import('./features/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: 'locations',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
