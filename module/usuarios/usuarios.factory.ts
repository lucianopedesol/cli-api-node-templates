
import { Request, Response } from "express";
import UsuariosRepository from "@repositories/usuarios";
import UsuariosController from "./usuarios.controller";
import UsuariosService from "./usuarios.service";
import { Usuarios } from "@entities/usuarios";

export const usuariosFactory = () => {
  const repository = new UsuariosRepository();
  const service = new UsuariosService(repository);
  const controller = new UsuariosController(service);

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

