import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Acceso permitido si hay sesión activa
  } else {
    // Redirige al Login si intenta entrar por la URL sin iniciar sesión
    router.navigate(['/login']);
    return false;
  }
};