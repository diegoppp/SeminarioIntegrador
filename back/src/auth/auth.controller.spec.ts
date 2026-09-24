import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { USERS_REPOSITORY } from '../users/repositories/users.repository';

jest.mock('@nestjs/config', () => ({
  ConfigService: jest
    .fn()
    .mockImplementation(() => ({ get: jest.fn(), getOrThrow: jest.fn() })),
}));

jest.mock('@nestjs/jwt', () => ({
  JwtService: jest.fn().mockImplementation(() => ({ sign: jest.fn() })),
}));

jest.mock('@nestjs/passport', () => ({
  AuthGuard: jest.fn().mockImplementation(() => class JwtAuthGuardMock {}),
}));

describe('AuthController', () => {
  let controller: AuthController;

  const usersRepositoryMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByEmail: jest.fn(),
    findByDni: jest.fn(),
    findByEmailWithPassword: jest.fn(),
    findByTokenVerificacionEmail: jest.fn(),
    findByTokenRecuperacionPassword: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: { get: jest.fn(), getOrThrow: jest.fn() },
        },
        { provide: JwtService, useValue: { sign: jest.fn() } },
        { provide: USERS_REPOSITORY, useValue: usersRepositoryMock },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
