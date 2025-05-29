export interface DetalleCompra {
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
}

export interface Compra {
  id?: number;
  fecha?: string; // timestampz
  total: number;
  usuario_id: number;
  detalles: DetalleCompra[];
} 