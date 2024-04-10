
import { Request, Response } from 'express';
import { handleHttpError } from "@api/errors"; 
import UsuariosService from "./usuarios.service";
import { Usuarios } from "@entities/usuarios";

export default class UsuariosController {
    constructor(private readonly service: UsuariosService) {}

    async handleCreate(req: Request, res: Response) {
        try {
          const usuariosDTO: Usuarios = req.body;
          const usuarios = await this.service.create(usuariosDTO);
          return res.status(201).json(usuarios);
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleFindAll(req: Request, res: Response) {
        try {
          const page = req.query["page"] as string;
          const usuariosList = await this.service.findAll(+page);
          return res.status(200).json(usuariosList);
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleFindOne(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const usuarios = await this.service.findOne(+id);
          return res.status(200).json(usuarios);
        } catch (err) {
          return handleHttpError(err, res);
        }
      }
      async handleUpdate(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const usuariosDTO = req.body;
          const usuarios = await this.service.update(+id, usuariosDTO);
          return res.status(200).json(usuarios);
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


