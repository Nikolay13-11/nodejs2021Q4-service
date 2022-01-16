import { ColumnClass } from "../../columns/column.model";

export interface IColumns {
    id: string;
    title: string;
    order: string;
}

export interface IBoard {
    id: string;
    title: string;
    columns: IColumns[]
}
export interface IBoardWoId {
    title:string;
    columns: IColumns[];
}

export interface INewBoard {
    title:string;
    columns: ColumnClass[] | null;
}
