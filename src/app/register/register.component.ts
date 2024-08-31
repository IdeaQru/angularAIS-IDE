import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  role: string = 'user'; // Default role
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  register() {
    const userData = {
      username: this.username,
      email: this.email,
      role: this.role,
      password: this.password
    };
    console.log("Data yang dikirim:", JSON.stringify(userData)); // Debugging data

    this.authService.register(userData).subscribe(
      response => {
        console.log('Registration successful', response);
        this.successMessage = 'Registration successful!';
        this.errorMessage = ''; // Clear error message if any
        // Tambahkan logika setelah pendaftaran berhasil, seperti navigasi ke halaman lain
      },
      error => {
        this.errorMessage = 'Registration failed! Please try again.';
        this.successMessage = ''; // Clear success message if any
        console.error('Registration failed', error);
      }
    );
  }
}
