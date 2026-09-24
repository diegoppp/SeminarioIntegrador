import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USERS_REPOSITORY } from './repositories/users.repository';
import type { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  // 1. Crear usuario
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const {
      email,
      dni,
      nombre,
      apellido,
      fechaNacimiento,
      provincia,
      telefono,
      rol,
      passwordHash,
    } = createUserDto;

    // Verificar si el email ya existe
    const userWithEmail = await this.usersRepository.findByEmail(email);
    if (userWithEmail) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // Verificar si el DNI ya existe
    const userWithDni = await this.usersRepository.findByDni(dni);
    if (userWithDni) {
      throw new ConflictException('El DNI ya se encuentra registrado');
    }

    const creadoEn = new Date();

    try {
      const savedUser = await this.usersRepository.create({
        nombre,
        apellido,
        email,
        dni,
        passwordHash,
        creadoEn,
        ...(fechaNacimiento
          ? { fechaNacimiento: new Date(fechaNacimiento) }
          : {}),
        ...(provincia ? { provincia } : {}),
        ...(telefono ? { telefono } : {}),
        ...(rol ? { rol } : {}),
      });
      return savedUser;
    } catch {
      throw new BadRequestException(
        'Error al registrar el usuario en la base de datos',
      );
    }
  }

  // 2. Obtener todos los usuarios
  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.findAll();
  }

  // 3. Buscar usuario por ID
  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  // 4. Buscar usuario por Email (incluyendo password para el Login)
  async findByEmailWithPassword(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findByEmailWithPassword(email);
  }

  // 5. Actualizar usuario (maneja la encriptación si viene una nueva contraseña)
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);
    const { passwordHash, fechaNacimiento, ...restData } = updateUserDto;

    // Convertir la fecha de nacimiento si viene en formato string
    if (fechaNacimiento) {
      user.fechaNacimiento = new Date(fechaNacimiento);
    }

    // Fusionar el resto de los datos actualizados
    Object.assign(user, restData);

    const updatedUser = await this.usersRepository.save(user);
    return updatedUser;
  }

  // 6. Eliminar usuario
  async remove(id: string): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return { message: `Usuario con ID ${id} eliminado correctamente` };
  }
}
