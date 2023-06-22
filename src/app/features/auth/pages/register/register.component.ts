import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage!: string;

  #fb = inject(FormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);

  ngOnInit(): void {
    this.registerForm = this.#fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  register() {
    if (this.registerForm.invalid) return;

    Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.#authService
      .register(this.registerForm.value)
      .pipe(
        catchError(error => {
          Swal.fire({
            title: '¡Error!',
            text: this.errorMessage ?? error.error.message,
            icon: 'error',
            confirmButtonText: 'Ok',
          });

          throw new Error(error.error.message);
        }),
      )
      .subscribe(res => {
        Swal.close();
        localStorage.setItem('token', res.token);
        this.#router.navigate(['/admin']);
      });
  }
}
