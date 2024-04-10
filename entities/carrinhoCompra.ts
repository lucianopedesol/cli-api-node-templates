
export class CarrinhoCompra {
  id?: number;
  title?: string; 

  constructor(carrinhoCompra: CarrinhoCompra) {
    const { id, ...content } = carrinhoCompra;
    Object.assign(this, content);
  }
}
