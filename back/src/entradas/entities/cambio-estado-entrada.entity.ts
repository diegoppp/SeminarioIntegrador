import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntryEntity } from './entry.entity';
import { EstadoEntrada } from '../enums/estado-entrada.enum';
import { Exclude } from 'class-transformer';

@Entity('cambios_estado_entrada')
export class CambioEstadoEntradaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  entradaId!: number;

  @ManyToOne(() => EntryEntity, { eager: true })
  @JoinColumn({ name: 'entradaId' })
  @Exclude()
  entrada!: EntryEntity;

  @Column({
    type: 'enum',
    enum: EstadoEntrada,
  })
  estado!: EstadoEntrada;

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

export { CambioEstadoEntradaEntity as CambioEstadoEntrada };
export { EstadoEntrada };


