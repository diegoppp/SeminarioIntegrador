import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ubicacion_evento')
export class UbicacionEventoEntity {
  @PrimaryGeneratedColumn()
  idUbicacion!: number;

  @Column()
  nombre!: string;

  @Column()
  direccion!: string;

  @Column()
  capacidad!: number;



}
