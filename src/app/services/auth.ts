import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(credenciales: { username: string; password: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, credenciales).pipe(
      tap(usuario => {
        // Guardar la sesión localmente al loguearse con éxito
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
      })
    );
  }

  registro(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/registro`, usuario);
  }

  logout(): void {
    localStorage.removeItem('usuarioLogueado');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('usuarioLogueado') !== null;
  }

  getUsuarioActual(): Usuario | null {
    const userJson = localStorage.getItem('usuarioLogueado');
    return userJson ? JSON.parse(userJson) : null;
  }
}