import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 1. Crear usuario con encriptación en el servicio
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, dni, password, ...restData } = createUserDto;

    // Verificar si el email ya existe
    const userWithEmail = await this.userRepository.findOne({ where: { email } });
    if (userWithEmail) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // Verificar si el DNI ya existe
    const userWithDni = await this.userRepository.findOne({ where: { dni } });
    if (userWithDni) {
      throw new ConflictException('El DNI ya se encuentra registrado');
    }

    try {
      // Encriptar la contraseña explícitamente
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Crear la instancia con la contraseña encriptada
      const newUser = this.userRepository.create({
        ...restData,
        email,
        dni,
        password: hashedPassword,
      });

      const savedUser = await this.userRepository.save(newUser);

      // Limpiar el campo password del objeto devuelto
      delete savedUser.password;
      return savedUser;
    } catch (error) {
      throw new BadRequestException('Error al registrar el usuario en la base de datos');
    }
  }

  // 2. Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // 3. Buscar usuario por ID
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  // 4. Buscar usuario por Email (incluyendo password para el Login)
  async findByEmailWithPassword(email: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  // 5. Actualizar usuario (maneja la encriptación si viene una nueva contraseña)
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const { password, ...restData } = updateUserDto;

    // Si el DTO incluye un nuevo password, lo encriptamos
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Fusionar el resto de los datos actualizados
    this.userRepository.merge(user, restData);

    const updatedUser = await this.userRepository.save(user);
    delete updatedUser.password;
    return updatedUser;
  }

  // 6. Eliminar usuario
  async remove(id: string): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { message: `Usuario con ID ${id} eliminado correctamente` };
  }
}