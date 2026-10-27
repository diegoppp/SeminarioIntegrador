import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntryFeeEntity } from '../../tarifas-entrada/entities/entry-fee.entity';
import { EntryEntity } from '../../entradas/entities/entry.entity';

@Entity('sectores')
export class SectorEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column()
  capacidad!: number;

  @OneToMany(() => EntryFeeEntity, (tarifa) => tarifa.sector)
  entryFees!: EntryFeeEntity[];

  @OneToMany(() => EntryEntity, (entrada) => entrada.sector)
  entries!: EntryEntity[];
}

export { SectorEntity as SectorsEntity };


