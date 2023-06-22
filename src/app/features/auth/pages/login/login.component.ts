import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;

  #fb = inject(FormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.#fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.#authService
      .login(this.loginForm.value)
      .pipe(
        catchError(error => {
          if (error.error.message.includes('email must be an email'))
            this.errorMessage = 'El correo electrónico debe ser válido';

          if (error.error.message.includes('Invalid credentials'))
            this.errorMessage = 'Credenciales inválidas';

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
