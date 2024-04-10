
import { CarrinhoCompra } from "@entities/carrinhoCompra";
import { prisma } from "@database/sql";
import { IRepository } from "@repositories/repository.interface";
import { Prisma } from "@prisma/client";

export interface ICarrinhoCompraRepository extends IRepository<CarrinhoCompra> {
}

export default class CarrinhoCompraRepository implements ICarrinhoCompraRepository {
  async create(carrinhoCompra: CarrinhoCompra): Promise<CarrinhoCompra> {
    const dataContent: Prisma.CarrinhoCompraCreateArgs = {
      data: {
        ...carrinhoCompra
      },
    };

    return await prisma.carrinhoCompra.create(dataContent);
  }
  async findAll(): Promise<CarrinhoCompra[]> {
    return await prisma.carrinhoCompra.findMany({ orderBy: { title: "asc" } });
  }
  async findById(id: number): Promise<CarrinhoCompra> {
    const carrinhoCompra = await prisma.carrinhoCompra.findUnique({
      where: { id },
      include: { group: { select: { title: true } } },
    });
    return carrinhoCompra;
  }
  
  async update(id: number, { title }: CarrinhoCompra): Promise<CarrinhoCompra> {
    const dataContent: Prisma.CarrinhoCompraUpdateArgs = {
      where: { id },
      data: { title, updated_at: new Date() },
    };
    return await prisma.carrinhoCompra.update(dataContent);
  }
  async remove(id: number): Promise<void> {
    await prisma.carrinhoCompra.delete({ where: { id } });
  }
}

