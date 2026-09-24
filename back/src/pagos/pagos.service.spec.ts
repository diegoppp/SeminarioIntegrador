import { Test, TestingModule } from '@nestjs/testing';
import { PagosService } from './pagos.service';
import { PAGOS_REPOSITORY } from './repositories/pagos.repository';
import { UsersService } from '../users/users.service';

describe('PagosService', () => {
  let service: PagosService;

  const pagosRepositoryMock = {
    createVenta: jest.fn(),
    findVentaById: jest.fn(),
    saveVenta: jest.fn(),
    createCobro: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagosService,
        { provide: PAGOS_REPOSITORY, useValue: pagosRepositoryMock },
        { provide: UsersService, useValue: { findOne: jest.fn() } },
      ],
    }).compile();

    service = module.get<PagosService>(PagosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
