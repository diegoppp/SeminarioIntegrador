import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TipoEventoEntity } from '../../tipo-evento/tipo-evento.entity';
import { UbicacionEventoEntity } from '../../ubicacion-evento/entities/ubicacion-evento.entity';

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

  @ManyToOne(() => TipoEventoEntity, { eager: true })
  @JoinColumn({ name: 'tipoEventoNombre', referencedColumnName: 'nombre' })
  tipoEvento!: TipoEventoEntity;

  @Column()
  estadoEvento!: string;

  @ManyToOne(() => UbicacionEventoEntity, { eager: true })
  @JoinColumn({ name: 'idUbicacion' })
  ubicacionEvento!: UbicacionEventoEntity;
}