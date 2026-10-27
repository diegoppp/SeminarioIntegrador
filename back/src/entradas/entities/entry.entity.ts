import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventoEntity } from '../../eventos/entities/evento.entity';
import { SectorEntity } from '../../sectores/entities/sector.entity';
import { EntryFeeEntity } from '../../tarifas-entrada/entities/entry-fee.entity';
import { CambioEstadoEntradaEntity } from './cambio-estado-entrada.entity';
import { EstadoEntrada } from '../enums/estado-entrada.enum';

@Entity('entradas')
export class EntryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaEmision!: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  codigoQR!: string | null;

  @Column({
    type: 'enum',
    enum: EstadoEntrada,
    default: EstadoEntrada.DISPONIBLE,
  })
  estado!: EstadoEntrada | string;

  @Column()
  eventoId!: number;

  @ManyToOne(() => EventoEntity, (evento) => evento.entries, { eager: true })
  @JoinColumn({ name: 'eventoId' })
  evento!: EventoEntity;

  @Column()
  sectorId!: number;

  @ManyToOne(() => SectorEntity, (sector) => sector.entries, { eager: true })
  @JoinColumn({ name: 'sectorId' })
  sector!: SectorEntity;

  @Column({ nullable: true })
  tarifaEntradaId!: number | null;

  @ManyToOne(() => EntryFeeEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'tarifaEntradaId' })
  entryFee!: EntryFeeEntity | null;

  @OneToMany(() => CambioEstadoEntradaEntity, (cambio) => cambio.entrada)
  cambiosEstado!: CambioEstadoEntradaEntity[];
}

export { EstadoEntrada };
export { CambioEstadoEntradaEntity };
export { CambioEstadoEntrada } from './cambio-estado-entrada.entity';



