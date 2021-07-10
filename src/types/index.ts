export interface ShapeItem {
  id: number;
  name: string;
  description: string;
  price: number;
  iconFile: string;
}

export type SaleItem = ShapeItem // | ...

export interface CartItem {
  id: number;
  item: SaleItem;
  quantity: number;
}