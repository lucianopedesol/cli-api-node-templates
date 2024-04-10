
import ServerError from "@api/errors/server.error";
import logger from "@utils/logger";
import { CarrinhoCompra } from "@entities/carrinhoCompra";
import { ICarrinhoCompraRepository } from "@repositories/carrinhoCompra";
import { CarrinhoCompra } from "@entities/carrinhoCompra";

export default class CarrinhoCompraService {
  constructor(
    private readonly repository: ICarrinhoCompraRepository,
  ) {
  }
  /**
   * Cria um novo colaborador de nível adm ou agent
   * @param carrinhoCompraData: CarrinhoCompra
   * @returns CarrinhoCompra
   */
  async create(carrinhoCompraData: CarrinhoCompra) {

    const carrinhoCompra = await this.repository.create(new CarrinhoCompra(carrinhoCompraData));
    return carrinhoCompra;
  }

  async findAll(page: number) {
    if (!page) page = 1;
    const elementsPerPage = 10;
    logger.info('Looking for all carrinhoCompraList in the page ' + page );

    const [carrinhoCompraList, totalOfCarrinhoCompras] = await Promise.all([
      this.repository.find(page, elementsPerPage),
      this.repository.counter(),
    ]);

    const pages = Math.ceil(totalOfCarrinhoCompras / elementsPerPage);
    logger.info('Total of carrinhoCompraList:' + totalOfCarrinhoCompras + ', total of pages:' + pages);

    return {
      currentPage: page,
      totalOfPages: pages,
      totalOfCarrinhoCompras,
      carrinhoCompraList,
    };
  }

  async findOne(id: number) {
    logger.info('Looking for carrinhoCompraee id ' + id );
    const carrinhoCompra = await this.repository.findById(id);
    if (!carrinhoCompra) throw ServerError.error404("Could not find this carrinhoCompra");

    return carrinhoCompra;
  }

  async update(id: number, carrinhoCompraData: CarrinhoCompra) {
    logger.info('Updating carrinhoCompraee id ' + id);
    await this.findOne(id);
 
    const carrinhoCompraToUpdate = new CarrinhoCompra(carrinhoCompraData);

    const carrinhoCompra = await this.repository.update(id, carrinhoCompraToUpdate); 
    logger.info('Updated client id ' + id);
    return carrinhoCompra;
  }

  async unregister(id: number) {
    logger.info('Deleting carrinhoCompra id ' + id );
    await this.findOne(id);
    await Promise.all([this.repository.remove(id)]);
  } 
}

