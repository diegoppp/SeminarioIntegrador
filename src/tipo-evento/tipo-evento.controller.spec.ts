import { Test, TestingModule } from '@nestjs/testing';
import { TipoEventoController } from './tipo-evento.controller';
import { TipoEventoService } from './tipo-evento.service';

describe('TipoEventoController', () => {
  let controller: TipoEventoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoEventoController],
      providers: [TipoEventoService],
    }).compile();

    controller = module.get<TipoEventoController>(TipoEventoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
