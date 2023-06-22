import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter } from 'rxjs';
import Swal from 'sweetalert2';

import { StoreService } from '../../services/store.service';
import { Store } from '../../../../core/models/Store';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss'],
})
export class EditStoreComponent implements OnInit {
  editStoreForm!: FormGroup;
  formData!: FormData;
  store!: Store;
  errorMessage!: string;
  id!: string;

  #fb = inject(FormBuilder);
  #storeService = inject(StoreService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.id = this.#route.snapshot.params['id'];

    this.#storeService
      .getStoreById(this.id)
      .pipe(
        catchError(error => {
          Swal.fire({
            title: '¡Error!',
            text: 'No existe una sucursal con ese ID',
            icon: 'error',
            confirmButtonText: 'Ok',
          }).then(result => {
            if (result.isConfirmed) {
              this.#router.navigate(['/admin']);
            }
          });

          throw new Error(error.error.message);
        }),
        filter(store => !!store),
      )
      .subscribe(store => {
        this.editStoreForm.patchValue(store);
      });

    this.editStoreForm = this.#fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      // image: [''],
      picture: [''],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });
  }

  handleImageChange(event: any) {
    const file = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('file', file);
  }

  editStore() {
    if (this.editStoreForm.invalid) return;

    // if (!this.editStoreForm.get('image')?.value) {
    //   this.editStoreForm.removeControl('image');
    // } else {
    //   this.#storeService.uploadStoreImage(this.formData).subscribe(res => {
    //     this.editStoreForm.get('picture')?.setValue(res.secureUrl);
    //     this.editStoreForm.removeControl('image');
    //   });
    // }

    this.#storeService
      .editStore(this.id, this.editStoreForm.value)
      .pipe(
        catchError(error => {
          if (error.error.message.includes('Store already exists {"name":'))
            this.errorMessage = 'Ya existe una sucursal con ese nombre';

          if (error.error.message.includes('Store already exists {"address":'))
            this.errorMessage = 'Ya existe una sucursal con esa dirección';

          Swal.fire({
            title: '¡Error!',
            text: this.errorMessage ?? error.error.message,
            icon: 'error',
            confirmButtonText: 'Ok',
          });

          throw new Error(error.error.message);
        }),
      )
      .subscribe(() => {
        this.#router.navigate(['/admin']);
      });
  }
}
