export interface Herb {
  id: number;
  name: string;
  unitPrice: number;
}

export interface AddedHerb extends Herb {
  totalPrice: number;
  orderWeight: number;
}
