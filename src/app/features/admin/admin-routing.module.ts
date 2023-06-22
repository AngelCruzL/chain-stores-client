import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ManageStoresComponent } from './pages/manage-stores/manage-stores.component';
import { AddNewStoreComponent } from './pages/add-new-store/add-new-store.component';
import { EditStoreComponent } from './pages/edit-store/edit-store.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: ManageStoresComponent },
      { path: 'new-store', component: AddNewStoreComponent },
      { path: 'edit-store/:id', component: EditStoreComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
