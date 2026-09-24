import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
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

describe('AuthService', () => {
  let service: AuthService;

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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
