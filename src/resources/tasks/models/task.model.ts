export interface ITask {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string;
    columnId: string;
}
export interface ITaskWoId {
    title: string;
    order: number;
    description: string;
    userId: null | string;
    boardId: string;
    columnId: string;
}
export interface ITaskUserId {
    userId: string | null;
}

export interface ITest {
    title: string,
    order: number,
    description: string
}

