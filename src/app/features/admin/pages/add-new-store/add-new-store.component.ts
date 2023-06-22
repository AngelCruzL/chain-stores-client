import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-add-new-store',
  templateUrl: './add-new-store.component.html',
  styleUrls: ['./add-new-store.component.scss'],
})
export class AddNewStoreComponent implements OnInit {
  newStoreForm!: FormGroup;
  formData!: FormData;
  errorMessage!: string;

  #fb = inject(FormBuilder);
  #storeService = inject(StoreService);
  #router = inject(Router);

  ngOnInit(): void {
    this.newStoreForm = this.#fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
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

  addNewStore() {
    if (this.newStoreForm.invalid) return;

    this.#storeService.uploadStoreImage(this.formData).subscribe(res => {
      this.newStoreForm.get('picture')?.setValue(res.secureUrl);
      this.newStoreForm.removeControl('image');
    });

    setTimeout(() => {
      this.#storeService
        .addNewStore(this.newStoreForm.value)
        .pipe(
          catchError(error => {
            if (error.error.message.includes('Store already exists {"name":'))
              this.errorMessage = 'Ya existe una sucursal con ese nombre';

            if (
              error.error.message.includes('Store already exists {"address":')
            )
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
    }, 200);
  }
}
