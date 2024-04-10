
import ServerError from "@api/errors/server.error";
import logger from "@utils/logger";
import { CarrinhoCompraVendas } from "@entities/carrinhoCompraVendas";
import { ICarrinhoCompraVendasRepository } from "@repositories/carrinhoCompraVendas";
import { CarrinhoCompraVendas } from "@entities/carrinhoCompraVendas";

export default class CarrinhoCompraVendasService {
  constructor(
    private readonly repository: ICarrinhoCompraVendasRepository,
  ) {
  }
  /**
   * Cria um novo colaborador de nível adm ou agent
   * @param carrinhoCompraVendasData: CarrinhoCompraVendas
   * @returns CarrinhoCompraVendas
   */
  async create(carrinhoCompraVendasData: CarrinhoCompraVendas) {

    const carrinhoCompraVendas = await this.repository.create(new CarrinhoCompraVendas(carrinhoCompraVendasData));
    return carrinhoCompraVendas;
  }

  async findAll(page: number) {
    if (!page) page = 1;
    const elementsPerPage = 10;
    logger.info('Looking for all carrinhoCompraVendasList in the page ' + page );

    const [carrinhoCompraVendasList, totalOfCarrinhoCompraVendass] = await Promise.all([
      this.repository.find(page, elementsPerPage),
      this.repository.counter(),
    ]);

    const pages = Math.ceil(totalOfCarrinhoCompraVendass / elementsPerPage);
    logger.info('Total of carrinhoCompraVendasList: ' + totalOfCarrinhoCompraVendass + ', total of pages: ' + pages);

    return {
      currentPage: page,
      totalOfPages: pages,
      totalOfCarrinhoCompraVendass,
      carrinhoCompraVendasList,
    };
  }

  async findOne(id: number) {
    logger.info('Looking for carrinhoCompraVendasee id ' + id );
    const carrinhoCompraVendas = await this.repository.findById(id);
    if (!carrinhoCompraVendas) throw ServerError.error404("Could not find this carrinhoCompraVendas");

    return carrinhoCompraVendas;
  }

  async update(id: number, carrinhoCompraVendasData: CarrinhoCompraVendas) {
    logger.info('Updating carrinhoCompraVendasee id ' + id);
    await this.findOne(id);
 
    const carrinhoCompraVendasToUpdate = new CarrinhoCompraVendas(carrinhoCompraVendasData);

    const carrinhoCompraVendas = await this.repository.update(id, carrinhoCompraVendasToUpdate); 
    logger.info('Updated client id ' + id);
    return carrinhoCompraVendas;
  }

  async unregister(id: number) {
    logger.info('Deleting carrinhoCompraVendas id ' + id );
    await this.findOne(id);
    await Promise.all([this.repository.remove(id)]);
  } 
}

