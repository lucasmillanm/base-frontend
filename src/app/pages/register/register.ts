import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  username = '';
  password = '';
  error = '';
  loading = false;

  submit() {
    this.error = '';
    this.loading = true;
    this.auth.register(this.email, this.username, this.password).subscribe({
      next: () => this.router.navigate(['/garage']),
      error: () => {
        this.error = 'Registration failed. Email or username may already be in use.';
        this.loading = false;
      }
    });
  }
}
