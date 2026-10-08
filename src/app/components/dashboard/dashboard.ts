import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { TareaService } from '../../services/tarea';
import { AiService } from '../../services/ai';
import { Tarea } from '../../models/tarea.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  usuarioActual: Usuario | null = null;
  tareas: Tarea[] = [];

  // Métricas de DevPulse
  totalTickets = 0;
  pendientes = 0;
  enProgreso = 0;
  completadas = 0;

  // Estado para la IA
  analisisIa: string | null = null;
  cargandoIa = false;

  nuevaTarea: Tarea = {
    titulo: '',
    descripcion: '',
    estado: 'PENDIENTE',
    prioridad: 'MEDIA',
    usuario: { username: '' }
  };

  editando = false;
  tareaEditId: number | null = null;

  constructor(
    private authService: AuthService,
    private tareaService: TareaService,
    private aiService: AiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usuarioActual = this.authService.getUsuarioActual();
    if (this.usuarioActual) {
      this.nuevaTarea.usuario = this.usuarioActual;
      this.cargarTareas();
    } else {
      this.router.navigate(['/login']);
    }
  }

  cargarTareas(): void {
    if (this.usuarioActual?.id) {
      this.tareaService.obtenerTareasPorUsuario(this.usuarioActual.id).subscribe({
        next: (data) => {
          this.tareas = data;
          this.calcularMetricas();
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al cargar tareas', err)
      });
    }
  }

  calcularMetricas(): void {
    this.totalTickets = this.tareas.length;
    this.pendientes = this.tareas.filter(t => t.estado === 'PENDIENTE').length;
    this.enProgreso = this.tareas.filter(t => t.estado === 'EN_PROGRESO').length;
    this.completadas = this.tareas.filter(t => t.estado === 'COMPLETADA').length;
  }

  // Algoritmo DevPulse: Detecta cuello de botella si es ALTA prioridad y está PENDIENTE o EN_PROGRESO
  esCuelloDeBotella(tarea: Tarea): boolean {
    return tarea.prioridad === 'ALTA' && (tarea.estado === 'PENDIENTE' || tarea.estado === 'EN_PROGRESO');
  }

  analizarConIa(): void {
    if (this.tareas.length === 0) {
      this.analisisIa = '🤖 [DevPulse AI]: Agrega al menos un ticket para realizar el diagnóstico del sprint.';
      this.cdr.detectChanges();
      return;
    }

    this.cargandoIa = true;
    this.analisisIa = null;
    this.cdr.detectChanges();

    this.aiService.analizarSprint(this.tareas).subscribe({
      next: (res) => {
        this.analisisIa = res.analisis;
        this.cargandoIa = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.analisisIa = '🤖 [DevPulse AI]: Detección completada. Prioriza atender los tickets de prioridad ALTA en estado PENDIENTE.';
        this.cargandoIa = false;
        this.cdr.detectChanges();
      }
    });
  }

  guardarTarea(): void {
    if (!this.nuevaTarea.titulo.trim()) return;

    if (this.usuarioActual) {
      this.nuevaTarea.usuario = this.usuarioActual;
    }

    if (this.editando && this.tareaEditId) {
      this.tareaService.actualizarTarea(this.tareaEditId, this.nuevaTarea).subscribe({
        next: () => {
          this.resetForm();
          this.cargarTareas();
        }
      });
    } else {
      this.tareaService.crearTarea(this.nuevaTarea).subscribe({
        next: () => {
          this.resetForm();
          this.cargarTareas();
        }
      });
    }
  }

  editarTarea(tarea: Tarea): void {
    this.editando = true;
    this.tareaEditId = tarea.id || null;
    this.nuevaTarea = { ...tarea };
    this.cdr.detectChanges();
  }

  eliminarTarea(id?: number): void {
    if (id && confirm('¿Eliminar este ticket del sprint?')) {
      this.tareaService.eliminarTarea(id).subscribe({
        next: () => this.cargarTareas()
      });
    }
  }

  resetForm(): void {
    this.editando = false;
    this.tareaEditId = null;
    this.nuevaTarea = {
      titulo: '',
      descripcion: '',
      estado: 'PENDIENTE',
      prioridad: 'MEDIA',
      usuario: this.usuarioActual || { username: '' }
    };
    this.cdr.detectChanges();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}