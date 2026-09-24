import { Test, TestingModule } from '@nestjs/testing';
import { UbicacionEventoService } from './ubicacion-evento.service';
import { UBICACION_EVENTO_REPOSITORY } from './repositories/ubicacion-evento.repository';

describe('UbicacionEventoService', () => {
  let service: UbicacionEventoService;

  const ubicacionEventoRepositoryMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UbicacionEventoService,
        {
          provide: UBICACION_EVENTO_REPOSITORY,
          useValue: ubicacionEventoRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UbicacionEventoService>(UbicacionEventoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
