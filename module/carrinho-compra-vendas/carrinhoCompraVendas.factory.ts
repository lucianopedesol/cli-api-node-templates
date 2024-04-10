
import { Request, Response } from "express";
import CarrinhoCompraVendasRepository from "@repositories/carrinhoCompraVendas";
import CarrinhoCompraVendasController from "./carrinhoCompraVendas.controller";
import CarrinhoCompraVendasService from "./carrinhoCompraVendas.service";
import { CarrinhoCompraVendas } from "@entities/carrinhoCompraVendas";

export const carrinhoCompraVendasFactory = () => {
  const repository = new CarrinhoCompraVendasRepository();
  const service = new CarrinhoCompraVendasService(repository);
  const controller = new CarrinhoCompraVendasController(service);

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

