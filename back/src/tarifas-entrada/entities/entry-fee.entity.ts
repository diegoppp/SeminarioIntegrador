import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { SectorEntity } from '../../sectores/entities/sector.entity';
import { EventoEntity } from '../../eventos/entities/evento.entity';

@Entity('tarifas_entrada')
@Unique(['eventoId', 'sectorId'])
export class EntryFeeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  eventoId!: number;

  @ManyToOne(() => EventoEntity, (evento) => evento.entryFees, { eager: true })
  @JoinColumn({ name: 'eventoId' })
  evento!: EventoEntity;

  @Column()
  sectorId!: number;

  @ManyToOne(() => SectorEntity, (sector) => sector.entryFees, { eager: true })
  @JoinColumn({ name: 'sectorId' })
  sector!: SectorEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto!: number;
}

export { EntryFeeEntity as TarifaEntradaEntity };
export { EntryFeeEntity as EntryFeesEntity };


