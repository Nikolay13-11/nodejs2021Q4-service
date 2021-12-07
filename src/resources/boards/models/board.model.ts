export interface IBoard {
    id: string;
    title:string;
    columns: IColumns[] | undefined | null
}
export interface IBoardWoId {
    title:string;
    columns: IColumns[]
}

export interface IColumns {
    id:string;
    title: string;
    order: string;
}
