import { DataSource } from 'typeorm';
import { TipoEventoEntity } from './tipo-evento.entity';

const tiposEvento = [
  { nombre: 'Concierto', descripcion: 'Evento musical en vivo' },
  { nombre: 'Festival', descripcion: 'Evento cultural con múltiples artistas' },
  { nombre: 'Teatro', descripcion: 'Representación de obras dramáticas' },
  { nombre: 'Deportivo', descripcion: 'Competencia deportiva' },
  { nombre: 'Fiesta', descripcion: 'Música, baile y dj en vivo' },
];

export async function seedTipoEvento(dataSource: DataSource) {
  const repo = dataSource.getRepository(TipoEventoEntity);

  for (const tipo of tiposEvento) {
    const existe = await repo.findOneBy({ nombre: tipo.nombre });

    if (!existe) {
      await repo.save(tipo);
    }
  }
}