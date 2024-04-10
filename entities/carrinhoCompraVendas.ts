
export class CarrinhoCompraVendas {
  id?: number;
  title?: string; 

  constructor(carrinhoCompraVendas: CarrinhoCompraVendas) {
    const { id, ...content } = carrinhoCompraVendas;
    Object.assign(this, content);
  }
}
