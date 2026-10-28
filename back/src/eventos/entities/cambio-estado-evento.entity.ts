import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventoEntity } from './evento.entity';
import { EstadoEvento } from '../enums/estado-evento.enum';

@Entity('cambios_estado_evento')
export class CambioEstadoEventoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  eventoId!: number;

  @ManyToOne(() => EventoEntity)
  @JoinColumn({ name: 'eventoId' })
  evento!: EventoEntity;

  @Column({
    type: 'enum',
    enum: EstadoEvento,
  })
  estado!: EstadoEvento;

  @Column({ type: 'timestamp' })
  fechaHoraInicio!: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaHoraFin!: Date | null;

  esActual(): boolean {
    const now = new Date();
    const inicio = this.fechaHoraInicio ? new Date(this.fechaHoraInicio) : null;
    const fin = this.fechaHoraFin ? new Date(this.fechaHoraFin) : null;
    if (!inicio) return false;
    if (fin) {
      return now >= inicio && now <= fin;
    }
    return now >= inicio;
  }
}

export { CambioEstadoEventoEntity as CambioEstadoEvento };
export { EstadoEvento };


