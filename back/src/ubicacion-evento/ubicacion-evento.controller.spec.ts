import { Test, TestingModule } from '@nestjs/testing';
import { UbicacionEventoController } from './ubicacion-evento.controller';
import { UbicacionEventoService } from './ubicacion-evento.service';

describe('UbicacionEventoController', () => {
  let controller: UbicacionEventoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UbicacionEventoController],
      providers: [UbicacionEventoService],
    }).compile();

    controller = module.get<UbicacionEventoController>(UbicacionEventoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
