import { EventoEntity } from "src/eventos/entities/evento.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity('tipo_evento')
export class TipoEventoEntity {
    @PrimaryColumn()
    nombre!: string;

    @Column()
    descripcion!: string;

    @ManyToOne(() => TipoEventoEntity, (tipo) => tipo.eventos, { eager: true })
  @JoinColumn({ name: 'tipo_evento_id' })
  tipoEvento!: TipoEventoEntity
  @OneToMany(() => EventoEntity, (evento) => evento.tipoEvento)
  eventos!: EventoEntity[];
}
