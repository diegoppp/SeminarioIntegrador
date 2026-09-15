import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RolUsuario {
  CLIENTE = 'CLIENTE',
  PRODUCTOR = 'PRODUCTOR',
  ADMIN = 'ADMIN',
}

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 100 })
  apellido!: string;

  @Column({ type: 'varchar', unique: true, length: 20 })
  dni!: string;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento!: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  provincia?: string;

  @Column({ type: 'varchar', unique: true, length: 150 })
  email!: string;

  @Column({ type: 'varchar', select: false }) // Oculta la contraseña en consultas por defecto
  password?: string;

  @Column({ type: 'varchar', nullable: true, length: 30 })
  telefono!: string;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.CLIENTE,
  })
  rol!: RolUsuario;

  @Column({ type: 'boolean', default: false })
  emailVerificado!: boolean;

  @Column({ type: 'varchar', nullable: true })
  tokenVerificacionEmail?: string;

  @Column({ type: 'varchar', nullable: true })
  tokenRecuperacionPassword?: string;

  @CreateDateColumn({ type: 'timestamp' })
  creadoEn!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  actualizadoEn!: Date;
}