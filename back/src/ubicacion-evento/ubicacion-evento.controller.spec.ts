import { Test, TestingModule } from '@nestjs/testing';
import { UbicacionEventoController } from './ubicacion-evento.controller';
import { UbicacionEventoService } from './ubicacion-evento.service';
import { UBICACION_EVENTO_REPOSITORY } from './repositories/ubicacion-evento.repository';

describe('UbicacionEventoController', () => {
  let controller: UbicacionEventoController;

  const ubicacionEventoRepositoryMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UbicacionEventoController],
      providers: [
        UbicacionEventoService,
        {
          provide: UBICACION_EVENTO_REPOSITORY,
          useValue: ubicacionEventoRepositoryMock,
        },
      ],
    }).compile();

    controller = module.get<UbicacionEventoController>(
      UbicacionEventoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
