import { Cobro } from '../entities/cobro.entity';
import { Venta } from '../../venta/entities/venta.entity';

export const PAGOS_REPOSITORY = 'PAGOS_REPOSITORY';

export interface PagosRepository {
  createVenta(data: Partial<Venta>): Promise<Venta>;
  findVentaById(id: string): Promise<Venta | null>;
  saveVenta(venta: Venta): Promise<Venta>;
  createCobro(data: Partial<Cobro>): Promise<Cobro>;
}
