import { Test, TestingModule } from '@nestjs/testing';
import { EventosService } from './eventos.service';
import { EVENTOS_REPOSITORY } from './repositories/eventos.repository';

describe('EventosService', () => {
  let service: EventosService;

  const eventosRepositoryMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventosService,
        { provide: EVENTOS_REPOSITORY, useValue: eventosRepositoryMock },
      ],
    }).compile();

    service = module.get<EventosService>(EventosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
