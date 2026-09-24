import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import type { UsersRepository } from './users.repository';

@Injectable()
export class TypeOrmUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user ?? null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ?? null;
  }

  async findByDni(dni: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { dni } });
    return user ?? null;
  }

  async findByEmailWithPassword(email: string): Promise<UserEntity | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findByTokenVerificacionEmail(
    token: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      where: { tokenVerificacionEmail: token },
    });
    return user ?? null;
  }

  async findByTokenRecuperacionPassword(
    token: string,
  ): Promise<UserEntity | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.tokenRecuperacionExpiracion')
      .where('user.tokenRecuperacionPassword = :token', { token })
      .getOne();
  }

  create(data: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepository.save(this.userRepository.create(data));
  }

  save(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  remove(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.remove(user);
  }
}
