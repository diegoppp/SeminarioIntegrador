import { Test, TestingModule } from '@nestjs/testing';
import { VentaController } from './venta.controller';
import { VentaService } from './venta.service';
import { VENTAS_REPOSITORY } from './repositories/venta.repository';
import { UsersService } from '../users/users.service';

describe('VentaController', () => {
  let controller: VentaController;

  const ventasRepositoryMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VentaController],
      providers: [
        VentaService,
        { provide: VENTAS_REPOSITORY, useValue: ventasRepositoryMock },
        { provide: UsersService, useValue: { findOne: jest.fn() } },
      ],
    }).compile();

    controller = module.get<VentaController>(VentaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
