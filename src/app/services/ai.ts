import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = 'http://localhost:8080/api/ai/analizar';

  constructor(private http: HttpClient) {}

  analizarSprint(tareas: any[]): Observable<{ analisis: string }> {
    const tareasJson = JSON.stringify(tareas);
    return this.http.post<{ analisis: string }>(this.apiUrl, tareasJson);
  }
}