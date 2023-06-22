import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  #router = inject(Router);

  logout() {
    localStorage.removeItem('token');
    this.#router.navigate(['/auth/login']);
  }
}
