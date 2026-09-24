import { Test, TestingModule } from '@nestjs/testing';
import { PagosController } from './pagos.controller';
import { PagosService } from './pagos.service';
import { PAGOS_REPOSITORY } from './repositories/pagos.repository';
import { UsersService } from '../users/users.service';

describe('PagosController', () => {
  let controller: PagosController;

  const pagosRepositoryMock = {
    createVenta: jest.fn(),
    findVentaById: jest.fn(),
    saveVenta: jest.fn(),
    createCobro: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagosController],
      providers: [
        PagosService,
        { provide: PAGOS_REPOSITORY, useValue: pagosRepositoryMock },
        { provide: UsersService, useValue: { findOne: jest.fn() } },
      ],
    }).compile();

    controller = module.get<PagosController>(PagosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
