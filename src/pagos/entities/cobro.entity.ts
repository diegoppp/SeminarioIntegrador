import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedioDePago } from "./medio-de-pago.entity";
export enum EstadoCobro{
    PENDIENTE='PENDIENTE',
    APROBADO='APROBADO',
    RECHAZADO='RECHAZADO'
}

@Entity('cobros')
export class Cobro{
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn({type: 'timestamp'})
    fechaCobro!:Date;
    
    @Column({type: 'varchar', precision : 10, scale: 2})
    monto!: number;

    @Column({type: 'enum', enum:EstadoCobro, default: EstadoCobro.PENDIENTE})
    estadoCobro!: EstadoCobro;

    @Column ({type: 'varchar', nullable:true})
    idTransaccion?: string;

    @ManyToOne(() => MedioDePago, { eager: true, nullable: true })
  @JoinColumn({ name: 'medio_de_pago_id' })
  medioDePago?: MedioDePago;

}