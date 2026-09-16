import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('tipo_evento')
export class TipoEventoEntity {
    @PrimaryColumn()
    nombre!: string;

    @Column()
    descripcion!: string;
}
