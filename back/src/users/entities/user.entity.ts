import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enums/rol.enum';

@Entity('usuarios')
export class UserEntity {
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

  @Column({ type: 'varchar', nullable: true, length: 30 })
  telefono!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENTE })
  rol!: UserRole;

  @Column({ type: 'boolean', default: false })
  emailVerificado!: boolean;

  @Column({ type: 'varchar', nullable: true })
  tokenVerificacionEmail: string | null = null;

  @Column({ type: 'varchar', nullable: true })
  tokenRecuperacionPassword: string | null = null;

  @Column({ type: 'timestamp', nullable: true })
  tokenRecuperacionExpiracion: Date | null = null;

  @CreateDateColumn({ type: 'timestamp' })
  creadoEn!: Date;

  @Column({ type: 'varchar', select: false, length: 255 })
  passwordHash!: string;
}
