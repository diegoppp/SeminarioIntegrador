import {Entity,PrimaryGeneratedColumn, Column} from 'typeorm';
@Entity('medios_de_pago')
export class MedioDePago{
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column ({type: 'varchar', length:100 })
    nombre!:string;

    @Column ({type: 'varchar', length: 250, nullable: true})
    descripcion?: string;
}
