
import { CarrinhoCompraVendas } from "@entities/carrinhoCompraVendas";
import { prisma } from "@database/sql";
import { IRepository } from "@repositories/repository.interface";
import { Prisma } from "@prisma/client";

export interface ICarrinhoCompraVendasRepository extends IRepository<CarrinhoCompraVendas> {
}

export default class CarrinhoCompraVendasRepository implements ICarrinhoCompraVendasRepository {
  async create(carrinhoCompraVendas: CarrinhoCompraVendas): Promise<CarrinhoCompraVendas> {
    const dataContent: Prisma.CarrinhoCompraVendasCreateArgs = {
      data: {
        ...carrinhoCompraVendas
      },
    };

    return await prisma.carrinhoCompraVendas.create(dataContent);
  }
  async findAll(): Promise<CarrinhoCompraVendas[]> {
    return await prisma.carrinhoCompraVendas.findMany({ orderBy: { title: "asc" } });
  }
  async findById(id: number): Promise<CarrinhoCompraVendas> {
    const carrinhoCompraVendas = await prisma.carrinhoCompraVendas.findUnique({
      where: { id },
      include: { group: { select: { title: true } } },
    });
    return carrinhoCompraVendas;
  }
  
  async update(id: number, { title }: CarrinhoCompraVendas): Promise<CarrinhoCompraVendas> {
    const dataContent: Prisma.CarrinhoCompraVendasUpdateArgs = {
      where: { id },
      data: { title, updated_at: new Date() },
    };
    return await prisma.carrinhoCompraVendas.update(dataContent);
  }
  async remove(id: number): Promise<void> {
    await prisma.carrinhoCompraVendas.delete({ where: { id } });
  }
}

