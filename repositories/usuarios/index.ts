
import { Usuarios } from "@entities/usuarios";
import { prisma } from "@database/sql";
import { IRepository } from "@repositories/repository.interface";
import { Prisma } from "@prisma/client";

export interface IUsuariosRepository extends IRepository<Usuarios> {
}

export default class UsuariosRepository implements IUsuariosRepository {
  async create(usuarios: Usuarios): Promise<Usuarios> {
    const dataContent: Prisma.UsuariosCreateArgs = {
      data: {
        ...usuarios
      },
    };

    return await prisma.usuarios.create(dataContent);
  }
  async findAll(): Promise<Usuarios[]> {
    return await prisma.usuarios.findMany({ orderBy: { title: "asc" } });
  }
  async findById(id: number): Promise<Usuarios> {
    const usuarios = await prisma.usuarios.findUnique({
      where: { id },
      include: { group: { select: { title: true } } },
    });
    return usuarios;
  }
  
  async update(id: number, { title }: Usuarios): Promise<Usuarios> {
    const dataContent: Prisma.UsuariosUpdateArgs = {
      where: { id },
      data: { title, updated_at: new Date() },
    };
    return await prisma.usuarios.update(dataContent);
  }
  async remove(id: number): Promise<void> {
    await prisma.usuarios.delete({ where: { id } });
  }
}

