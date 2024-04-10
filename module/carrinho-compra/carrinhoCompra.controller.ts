
import { Request, Response } from 'express';
import { handleHttpError } from "@api/errors"; 
import CarrinhoCompraService from "./carrinhoCompra.service";
import { CarrinhoCompra } from "@entities/carrinhoCompra";

export default class CarrinhoCompraController {
    constructor(private readonly service: CarrinhoCompraService) {}

    async handleCreate(req: Request, res: Response) {
        try {
          const carrinhoCompraDTO: CarrinhoCompra = req.body;
          const carrinhoCompra = await this.service.create(carrinhoCompraDTO);
          return res.status(201).json(carrinhoCompra);
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleFindAll(req: Request, res: Response) {
        try {
          const page = req.query["page"] as string;
          const carrinhoCompraList = await this.service.findAll(+page);
          return res.status(200).json(carrinhoCompraList);
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleFindOne(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const carrinhoCompra = await this.service.findOne(+id);
          return res.status(200).json(carrinhoCompra);
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleUpdate(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const carrinhoCompraDTO = req.body;
          const carrinhoCompra = await this.service.update(+id, carrinhoCompraDTO);
          return res.status(200).json(carrinhoCompra);
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleDelete(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const carrinhoCompraDTO = req.body;
          const carrinhoCompra = await this.service.remove(+id, carrinhoCompraDTO);
          return res.status(200).json(carrinhoCompra);
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
}


