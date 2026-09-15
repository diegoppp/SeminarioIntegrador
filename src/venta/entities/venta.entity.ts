import { Cobro } from "src/pagos/entities/cobro.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity ('ventas')
export class Venta {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @CreateDateColumn({type: 'timestamp'})
    fechaVenta!:Date;

    @Column({type:'varchar', unique: true})
    numeroVenta!:string;

    @Column ({type:'decimal', precision:10, scale:2, default:0})
    total!:number;

    @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: User;

  // Relación con el módulo de Pagos
  @OneToOne(() => Cobro, { cascade: true, eager: true, nullable: true })
  @JoinColumn({ name: 'cobro_id' })
  cobro?: Cobro;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta, { cascade: true })
  detalleVenta!: DetalleVenta[];

}
