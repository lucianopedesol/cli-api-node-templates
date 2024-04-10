
import { Request, Response } from 'express';
import { handleHttpError } from "@api/errors"; 
import CarrinhoCompraVendasService from "./carrinhoCompraVendas.service";
import { CarrinhoCompraVendas } from "@entities/carrinhoCompraVendas";

export default class CarrinhoCompraVendasController {
    constructor(private readonly service: CarrinhoCompraVendasService) {}

    async handleCreate(req: Request, res: Response) {
        try {
          const carrinhoCompraVendasDTO: CarrinhoCompraVendas = req.body;
          const carrinhoCompraVendas = await this.service.create(carrinhoCompraVendasDTO);
          return res.status(201).json(carrinhoCompraVendas);
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleFindAll(req: Request, res: Response) {
        try {
          const page = req.query["page"] as string;
          const carrinhoCompraVendasList = await this.service.findAll(+page);
          return res.status(200).json(carrinhoCompraVendasList);
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleFindOne(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const carrinhoCompraVendas = await this.service.findOne(+id);
          return res.status(200).json(carrinhoCompraVendas);
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleUpdate(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const carrinhoCompraVendasDTO = req.body;
          const carrinhoCompraVendas = await this.service.update(+id, carrinhoCompraVendasDTO);
          return res.status(200).json(carrinhoCompraVendas);
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


