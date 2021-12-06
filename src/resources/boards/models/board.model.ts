export interface IBoard {
    id: string;
    title:string;
    columns: IColumns[]
}

interface IColumns {
    id:string;
    title: string;
    order: string;
}
