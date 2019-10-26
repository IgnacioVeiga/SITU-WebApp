export class ItemDeLista { // lo que conociamos como "ListItem"
    public id: number;
    public texto: string;
    public seleccionado: boolean;
}

export class InformacionDTO { // para alertas o noticias
    public titulo: string;
    public subtitulo: string;
    public miniatura = ''; // base64
    public fuente: string;
    public fecha: Date;
}
