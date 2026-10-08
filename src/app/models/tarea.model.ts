import { Usuario } from './usuario.model';

export interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  estado: string; // 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA'
  prioridad: string; // 'BAJA' | 'MEDIA' | 'ALTA'
  fechaCreacion?: string;
  usuario: Usuario;
}