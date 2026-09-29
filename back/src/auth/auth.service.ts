import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { UserRole } from '../users/enums/rol.enum';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { ForgotPasswordDto } from './dto/forgotPassword-auth.dto';
import { ResetPasswordDto } from './dto/resetPassword-auth.dto';
import { randomUUID } from 'crypto';
import { Resend } from 'resend';
import { USERS_REPOSITORY } from '../users/repositories/users.repository';
import type { UsersRepository } from '../users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepo: UsersRepository,
    private readonly cfg: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private frontendUrl(path: string): string {
    const baseUrl = this.cfg.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
    return `${baseUrl}${path}`;
  }

  private formatUser(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
      role: user.rol,
      isVerified: user.emailVerificado,
      createdAt: user.creadoEn,
    };
  }

  async getMe(userId: string) {
    return this.usersRepo.findOne(userId);
  }

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();

    const existing = await this.usersRepo.findByEmail(email);
    if (existing) {
      throw new ConflictException('El email ya está registrado');
    }

    const existingDni = await this.usersRepo.findByDni(dto.dni);
    if (existingDni) {
      throw new ConflictException('El DNI ya está registrado');
    }

    //Crear hash de la contraseña
    const rounds = Number(this.cfg.get<string>('BCRYPT_COST') ?? '12');
    const passwordHash = await bcrypt.hash(dto.password, rounds);
    const countUsers = await this.usersRepo
      .findAll()
      .then((users) => users.length);
    
    //Creacion de rol como admin(solo en desarrollo)
    const rol = countUsers === 0 ? UserRole.ADMIN : UserRole.CLIENTE;
    const tokenVerificacionEmail = randomUUID();

    const entity = await this.usersRepo.create({
      email,
      nombre: dto.nombre,
      apellido: dto.apellido,
      dni: dto.dni,
      passwordHash,
      rol,
      tokenVerificacionEmail,
      ...(dto.fechaNacimiento
        ? { fechaNacimiento: new Date(dto.fechaNacimiento) }
        : {}),
      ...(dto.provincia ? { provincia: dto.provincia } : {}),
      ...(dto.telefono ? { telefono: dto.telefono } : {}),
    });

    const resend = new Resend(this.cfg.getOrThrow<string>('RESEND_API_KEY'));
    const verificationUrl = this.frontendUrl(
      `/verify-email?token=${tokenVerificacionEmail}`,
    );

    const fromEmail = this.cfg.get<string>('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';

    await resend.emails.send({
      from: fromEmail,
      to: [entity.email],
      subject: 'Verification Link',
      html: `<p><a href="${verificationUrl}">Link para verificar email</a></p>`,
    });

    const accessToken = this.jwtService.sign({
      sub: entity.id,
      role: entity.rol,
    });

    return {
      user: this.formatUser(entity),
      access_token: accessToken,
    };
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();

    const user = await this.usersRepo.findByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      role: user.rol,
    });

    return {
      user: this.formatUser(user),
      access_token: accessToken,
    };
  }

  async verifyEmail(token: string) {
    const user = await this.usersRepo.findByTokenVerificacionEmail(token);
    if (!user) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    user.emailVerificado = true;
    user.tokenVerificacionEmail = null;
    await this.usersRepo.save(user);

    return { message: 'Email verificado' };
  }

  async resendVerification(userId: string) {
    const user = await this.usersRepo.findOne(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (user.emailVerificado) {
      throw new BadRequestException('El email ya está verificado');
    }

    const newToken = randomUUID();
    user.tokenVerificacionEmail = newToken;
    await this.usersRepo.save(user);

    const verificationUrl = this.frontendUrl(
      `/verify-email?token=${newToken}`,
    );
    const resend = new Resend(this.cfg.getOrThrow<string>('RESEND_API_KEY'));
    const fromEmail =
      this.cfg.get<string>('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';
    await resend.emails.send({
      from: fromEmail,
      to: [user.email],
      subject: 'Verification Link',
      html: `<p><a href="${verificationUrl}">Link para verificar email</a></p>`,
    });

    return { message: 'Email reenviado' };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.usersRepo.findByEmail(email);

    if (user) {
      const token = randomUUID();
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      user.tokenRecuperacionPassword = token;
      user.tokenRecuperacionExpiracion = expires;
      await this.usersRepo.save(user) 
      const resetUrl = this.frontendUrl(`/reset-password?token=${token}`);
      const resend = new Resend(this.cfg.getOrThrow<string>('RESEND_API_KEY'));
      const fromEmail =
        this.cfg.get<string>('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';

      await resend.emails.send({
        from: fromEmail,
        to: [user.email],
        subject: 'Password Reset',
        html: `<p><a href="${resetUrl}">Link para resetear contraseña</a></p>`,
      });
    }

    return { message: 'Recibirás un link para resetear tu contraseña' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.usersRepo.findByTokenRecuperacionPassword(
      dto.token,
    );

    if (
      !user ||
      !user.tokenRecuperacionExpiracion ||
      user.tokenRecuperacionExpiracion < new Date()
    ) {
      throw new BadRequestException('Token inválido o expirado');
    }

    const rounds = Number(this.cfg.get<string>('BCRYPT_COST') ?? '12');
    const passwordHash = await bcrypt.hash(dto.password, rounds);

    user.passwordHash = passwordHash;
    user.tokenRecuperacionPassword = null;
    user.tokenRecuperacionExpiracion = null;
    await this.usersRepo.save(user);

    return { message: 'Contraseña actualizada' };
  }
}
