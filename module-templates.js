const controllerContent = (propertyName, varName) => `
import { Request, Response } from 'express';
import { handleHttpError } from "@api/errors"; 
import ${propertyName}Service from "./${varName}.service";
import { ${propertyName} } from "@entities/${varName}";

export default class ${propertyName}Controller {
    constructor(private readonly service: ${propertyName}Service) {}

    async handleCreate(req: Request, res: Response) {
        try {
          const ${varName}DTO: ${propertyName} = req.body;
          const ${varName} = await this.service.create(${varName}DTO);
          return res.status(201).json(${varName});
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleFindAll(req: Request, res: Response) {
        try {
          const page = req.query["page"] as string;
          const ${varName}List = await this.service.findAll(+page);
          return res.status(200).json(${varName}List);
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleFindOne(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const ${varName} = await this.service.findOne(+id);
          return res.status(200).json(${varName});
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleUpdate(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const ${varName}DTO = req.body;
          const ${varName} = await this.service.update(+id, ${varName}DTO);
          return res.status(200).json(${varName});
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleDelete(req: Request, res: Response) {
        try {
          const { id } = req.params;
          await this.service.unregister(+id);
          return res.sendStatus(200);
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
}\n

`;
const factoryContent = (propertyName, varName) => `
import { Request, Response } from "express";
import ${propertyName}Repository from "@repositories/${varName}";
import ${propertyName}Controller from "./${varName}.controller";
import ${propertyName}Service from "./${varName}.service";
import { ${propertyName} } from "@entities/${varName}";

export const ${varName}Factory = () => {
  const repository = new ${propertyName}Repository();
  const service = new ${propertyName}Service(repository);
  const controller = new ${propertyName}Controller(service);

  const create = () => async (req: Request, res: Response) => {
    return await controller.handleCreate(req, res);
  };
  
  const findOne = () => async (req: Request, res: Response) => {
    return await controller.handleFindOne(req, res);
  };

  const findAll = () => {
    return async (req: Request, res: Response) => await controller.handleFindAll(req, res);
  };
 
  const update = () => async (req: Request, res: Response) => {
    return await controller.handleUpdate(req, res);
  };
  const remove = () => async (req: Request, res: Response) => {
    return await controller.handleDelete(req, res);
  };
 

  return {
    create,
    findAll,
    findOne,
    update,
    remove,
  };
};

`;

const serviceContent = (propertyName, varName) => `
import ServerError from "@api/errors/server.error";
import logger from "@utils/logger";
import { ${propertyName} } from "@entities/${varName}";
import { I${propertyName}Repository } from "@repositories/${varName}";
import { ${propertyName} } from "@entities/${varName}";

export default class ${propertyName}Service {
  constructor(
    private readonly repository: I${propertyName}Repository,
  ) {
  }
  /**
   * Cria um novo colaborador de nível adm ou agent
   * @param ${varName}Data: ${propertyName}
   * @returns ${propertyName}
   */
  async create(${varName}Data: ${propertyName}) {

    const ${varName} = await this.repository.create(new ${propertyName}(${varName}Data));
    return ${varName};
  }

  async findAll(page: number) {
    if (!page) page = 1;
    const elementsPerPage = 10;
    logger.info('Looking for all ${varName}List in the page ' + page );

    const [${varName}List, totalOf${propertyName}s] = await Promise.all([
      this.repository.find(page, elementsPerPage),
      this.repository.counter(),
    ]);

    const pages = Math.ceil(totalOf${propertyName}s / elementsPerPage);
    logger.info('Total of ${varName}List: ' + totalOf${propertyName}s + ', total of pages: ' + pages);

    return {
      currentPage: page,
      totalOfPages: pages,
      totalOf${propertyName}s,
      ${varName}List,
    };
  }

  async findOne(id: number) {
    logger.info('Looking for ${varName}ee id ' + id );
    const ${varName} = await this.repository.findById(id);
    if (!${varName}) throw ServerError.error404("Could not find this ${varName}");

    return ${varName};
  }

  async update(id: number, ${varName}Data: ${propertyName}) {
    logger.info('Updating ${varName}ee id ' + id);
    await this.findOne(id);
 
    const ${varName}ToUpdate = new ${propertyName}(${varName}Data);

    const ${varName} = await this.repository.update(id, ${varName}ToUpdate); 
    logger.info('Updated client id ' + id);
    return ${varName};
  }

  async unregister(id: number) {
    logger.info('Deleting ${varName} id ' + id );
    await this.findOne(id);
    await Promise.all([this.repository.remove(id)]);
  } 
}

`;

const repositoryContent = (propertyName, varName) => `
import { ${propertyName} } from "@entities/${varName}";
import { prisma } from "@database/sql";
import { IRepository } from "@repositories/repository.interface";
import { Prisma } from "@prisma/client";

export interface I${propertyName}Repository extends IRepository<${propertyName}> {
}

export default class ${propertyName}Repository implements I${propertyName}Repository {
  async create(${varName}: ${propertyName}): Promise<${propertyName}> {
    const dataContent: Prisma.${propertyName}CreateArgs = {
      data: {
        ...${varName}
      },
    };

    return await prisma.${varName}.create(dataContent);
  }
  async findAll(): Promise<${propertyName}[]> {
    return await prisma.${varName}.findMany({ orderBy: { title: "asc" } });
  }
  async findById(id: number): Promise<${propertyName}> {
    const ${varName} = await prisma.${varName}.findUnique({
      where: { id },
      include: { group: { select: { title: true } } },
    });
    return ${varName};
  }
  
  async update(id: number, { title }: ${propertyName}): Promise<${propertyName}> {
    const dataContent: Prisma.${propertyName}UpdateArgs = {
      where: { id },
      data: { title, updated_at: new Date() },
    };
    return await prisma.${varName}.update(dataContent);
  }
  async remove(id: number): Promise<void> {
    await prisma.${varName}.delete({ where: { id } });
  }
}

`;

const entityContent = (propertyName, varName) => `
export class ${propertyName} {
  id?: number;
  title?: string; 

  constructor(${varName}: ${propertyName}) {
    const { id, ...content } = ${varName};
    Object.assign(this, content);
  }
}
`;


module.exports = {
  factoryContent,
  controllerContent,
  serviceContent,
  repositoryContent,
  entityContent
}