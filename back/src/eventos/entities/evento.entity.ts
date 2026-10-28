import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TipoEventoEntity } from '../../tipo-evento/tipo-evento.entity';
import { UbicacionEventoEntity } from '../../ubicacion-evento/entities/ubicacion-evento.entity';
import { EntryEntity } from '../../entradas/entities/entry.entity';
import { EntryFeeEntity } from '../../tarifas-entrada/entities/entry-fee.entity';
import { CambioEstadoEventoEntity } from './cambio-estado-evento.entity';

@Entity('eventos')
export class EventoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column()
  fechaHoraInicio!: Date;

  @Column()
  fechaHoraFin!: Date;

  @Column({ name: 'tipoEventoNombre' })
  tipoEventoNombre!: string;

  // REMOVIDO: { eager: true }
  @ManyToOne(() => TipoEventoEntity)
  @JoinColumn({ name: 'tipoEventoNombre', referencedColumnName: 'nombre' })
  tipoEvento!: TipoEventoEntity;

  // REMOVIDO: { eager: true }
  @ManyToOne(() => UbicacionEventoEntity)
  @JoinColumn({ name: 'idUbicacion' })
  ubicacionEvento!: UbicacionEventoEntity;

  @OneToMany(() => EntryEntity, (entrada) => entrada.evento)
  entries!: EntryEntity[];

  @OneToMany(() => EntryFeeEntity, (tarifa) => tarifa.evento)
  entryFees!: EntryFeeEntity[];

  @OneToMany(() => CambioEstadoEventoEntity, (cambio) => cambio.evento)
  cambiosEstado!: CambioEstadoEventoEntity[];

  @Column({ type: 'varchar', length: 500, nullable: true })
  imagenUrl!: string | null;
}

export { CambioEstadoEventoEntity };
export { CambioEstadoEvento } from './cambio-estado-evento.entity';