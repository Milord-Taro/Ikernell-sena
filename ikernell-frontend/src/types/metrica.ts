// Refleja los DTOs de com.ikernell.backend.dto usados por /api/metricas/*.
// Sin colorVar/icon -- eso se agrega en MetricasPage.tsx al renderizar,
// el backend solo manda label + value.

import type { TipoFeed } from '../components/charts/FeedActividadReciente';

export interface MetricaTarjeta {
  label: string;
  value: number;
}

export interface BarraDatoApi {
  label: string;
  value: number;
}

export interface ItemRankingApi {
  id: number;
  label: string;
  value: number;
}

export interface PuntoDiarioApi {
  etiqueta: string;
  value: number;
}

export interface ItemFeedApi {
  id: string;
  tipo: TipoFeed;
  titulo: string;
  detalle: string;
  fecha: string;
}

export interface MetricasResponse {
  cards: MetricaTarjeta[];
  erroresPorSeveridad: BarraDatoApi[];
  erroresPorEstado: BarraDatoApi[];
  actividadesPorEstado: BarraDatoApi[];
  /** Solo Coordinador -- null para Líder/Desarrollador. */
  proyectosPorEstado: BarraDatoApi[] | null;
  /** Solo Coordinador -- null para Líder/Desarrollador. */
  rankingErroresPorProyecto: ItemRankingApi[] | null;
  tendenciaFinalizadas: PuntoDiarioApi[];
  feed: ItemFeedApi[];
}
