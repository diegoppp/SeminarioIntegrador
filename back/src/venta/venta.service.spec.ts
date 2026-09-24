import { Test, TestingModule } from '@nestjs/testing';
import { VentaService } from './venta.service';
import { UsersService } from '../users/users.service';
import { VENTAS_REPOSITORY } from './repositories/venta.repository';

describe('VentaService', () => {
  let service: VentaService;

  const ventasRepositoryMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VentaService,
        { provide: VENTAS_REPOSITORY, useValue: ventasRepositoryMock },
        { provide: UsersService, useValue: { findOne: jest.fn() } },
      ],
    }).compile();

    service = module.get<VentaService>(VentaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
