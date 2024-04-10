
import ServerError from "@api/errors/server.error";
import logger from "@utils/logger";
import { Usuarios } from "@entities/usuarios";
import { IUsuariosRepository } from "@repositories/usuarios";
import { Usuarios } from "@entities/usuarios";

export default class UsuariosService {
  constructor(
    private readonly repository: IUsuariosRepository,
  ) {
  }
  /**
   * Cria um novo colaborador de nível adm ou agent
   * @param usuariosData: Usuarios
   * @returns Usuarios
   */
  async create(usuariosData: Usuarios) {

    const usuarios = await this.repository.create(new Usuarios(usuariosData));
    return usuarios;
  }

  async findAll(page: number) {
    if (!page) page = 1;
    const elementsPerPage = 10;
    logger.info('Looking for all usuariosList in the page ' + page );

    const [usuariosList, totalOfUsuarioss] = await Promise.all([
      this.repository.find(page, elementsPerPage),
      this.repository.counter(),
    ]);

    const pages = Math.ceil(totalOfUsuarioss / elementsPerPage);
    logger.info('Total of usuariosList:' + totalOfUsuarioss + ', total of pages:' + pages);

    return {
      currentPage: page,
      totalOfPages: pages,
      totalOfUsuarioss,
      usuariosList,
    };
  }

  async findOne(id: number) {
    logger.info('Looking for usuariosee id ' + id );
    const usuarios = await this.repository.findById(id);
    if (!usuarios) throw ServerError.error404("Could not find this usuarios");

    return usuarios;
  }

  async update(id: number, usuariosData: Usuarios) {
    logger.info('Updating usuariosee id ' + id);
    await this.findOne(id);
 
    const usuariosToUpdate = new Usuarios(usuariosData);

    const usuarios = await this.repository.update(id, usuariosToUpdate); 
    logger.info('Updated client id ' + id);
    return usuarios;
  }

  async unregister(id: number) {
    logger.info('Deleting usuarios id ' + id );
    await this.findOne(id);
    await Promise.all([this.repository.remove(id)]);
  } 
}

