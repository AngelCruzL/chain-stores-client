import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { StoreService } from '../../services/store.service';
import { Store } from '../../../../core/models/Store';

@Component({
  selector: 'app-manage-stores',
  templateUrl: './manage-stores.component.html',
  styleUrls: ['./manage-stores.component.scss'],
})
export class ManageStoresComponent implements OnInit {
  stores: Store[] = [];
  #storeService = inject(StoreService);

  ngOnInit(): void {
    this.#storeService.getStores().subscribe(stores => {
      this.stores = stores;
    });
  }

  deleteStore(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Estas seguro que deseas eliminar la sucursal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar Sucursal',
    }).then(result => {
      if (result.isConfirmed) {
        this.#storeService.deleteStore(id).subscribe(() => {
          this.stores = this.stores.filter(store => store._id !== id);
        });

        Swal.fire(
          'Eliminación exitosa!',
          'La sucursal ha sido eliminada exitosamente',
          'success',
        );
      }
    });
  }
}
