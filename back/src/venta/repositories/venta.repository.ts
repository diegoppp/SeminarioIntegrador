import { Venta } from '../entities/venta.entity';

export const VENTAS_REPOSITORY = 'VENTAS_REPOSITORY';

export interface VentasRepository {
  findAll(): Promise<Venta[]>;
  findOne(id: string): Promise<Venta | null>;
  create(data: Partial<Venta>): Promise<Venta>;
  update(id: string, data: Partial<Venta>): Promise<Venta | null>;
  remove(id: string): Promise<Venta | null>;
}
