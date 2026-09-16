import { Test, TestingModule } from '@nestjs/testing';
import { UbicacionEventoService } from './ubicacion-evento.service';

describe('UbicacionEventoService', () => {
  let service: UbicacionEventoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UbicacionEventoService],
    }).compile();

    service = module.get<UbicacionEventoService>(UbicacionEventoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
