
import { Request, Response } from "express";
import CarrinhoCompraRepository from "@repositories/carrinhoCompra";
import CarrinhoCompraController from "./carrinhoCompra.controller";
import CarrinhoCompraService from "./carrinhoCompra.service";
import { CarrinhoCompra } from "@entities/carrinhoCompra";

export const carrinhoCompraFactory = () => {
  const repository = new CarrinhoCompraRepository();
  const service = new CarrinhoCompraService(repository);
  const controller = new CarrinhoCompraController(service);

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

