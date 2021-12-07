export interface ITask {
    id: string;
    title: string;
    order: string;
    description: string;
    userId: string | null;
    boardId: string;
    columnId: string;
}
export interface ITaskWoId {
    title: string;
    order: string;
    description: string;
    userId: string | null;
    boardId: string;
    columnId: string;
}
export interface ITaskUserId {
    userId: string | null;
}

