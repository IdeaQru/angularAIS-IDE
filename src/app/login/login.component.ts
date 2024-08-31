import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password,
    };
    this.authService.login(credentials).subscribe(
      (response) => {
        // Simpan token dan nama pengguna setelah login berhasil
        const userName = response.userName; // Asumsikan server mengirim nama pengguna
        const token = response.token; // Asumsikan server mengirim token

        localStorage.setItem('token', token); // Simpan token ke localStorage
        this.authService.saveUserName(userName); // Simpan nama pengguna ke localStorage
        console.log('Login response:', response); // Tambahkan ini untuk melihat respons

        this.router.navigate(['/dashboard']); // Arahkan pengguna ke halaman dashboard
      },
      (error) => {
        this.errorMessage = 'Login failed! Please try again.';
        console.error('Login failed', error);
      }
    );
  }
}
