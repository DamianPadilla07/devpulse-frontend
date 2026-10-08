import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  esLogin = true;

  loginData = { username: '', password: '' };
  registroData = { username: '', email: '', password: '', nombre: '' };

  mensajeError = '';
  mensajeExito = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  onLogin(): void {
    this.mensajeError = '';
    this.mensajeExito = '';
    this.cdr.detectChanges();

    this.authService.login(this.loginData).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error: (err) => {
        this.mensajeError = err.error?.mensaje || 'Credenciales incorrectas';
        this.cdr.detectChanges();
      }
    });
  }

  onRegistro(): void {
    this.mensajeError = '';
    this.mensajeExito = '';
    this.cdr.detectChanges();

    this.authService.registro(this.registroData).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.mensajeExito = '¡Registro exitoso! Ya puedes iniciar sesión.';
          this.esLogin = true;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        // Extrae el texto del mensaje si viene dentro de un JSON
        this.mensajeError = typeof err.error === 'object' ? (err.error.mensaje || 'Error al registrar') : err.error;
        this.cdr.detectChanges();
      }
    });
  }

  toggleModo(): void {
    this.esLogin = !this.esLogin;
    this.mensajeError = '';
    this.mensajeExito = '';
    this.cdr.detectChanges();
  }
}