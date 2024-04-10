
export class Usuarios {
  id?: number;
  title?: string; 

  constructor(usuarios: Usuarios) {
    const { id, ...content } = usuarios;
    Object.assign(this, content);
  }
}
