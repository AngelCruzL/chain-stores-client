import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ManageStoresComponent } from './pages/manage-stores/manage-stores.component';
import { AddNewStoreComponent } from './pages/add-new-store/add-new-store.component';
import { EditStoreComponent } from './pages/edit-store/edit-store.component';

@NgModule({
  declarations: [
    AdminComponent,
    ManageStoresComponent,
    AddNewStoreComponent,
    EditStoreComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
