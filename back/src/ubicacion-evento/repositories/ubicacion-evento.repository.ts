import { UbicacionEventoEntity } from '../entities/ubicacion-evento.entity';

export const UBICACION_EVENTO_REPOSITORY = 'UBICACION_EVENTO_REPOSITORY';

export interface UbicacionEventoRepository {
  findAll(): Promise<UbicacionEventoEntity[]>;
  findOne(id: number): Promise<UbicacionEventoEntity | null>;
  create(data: Partial<UbicacionEventoEntity>): Promise<UbicacionEventoEntity>;
  update(
    id: number,
    data: Partial<UbicacionEventoEntity>,
  ): Promise<UbicacionEventoEntity | null>;
  remove(id: number): Promise<UbicacionEventoEntity | null>;
}
