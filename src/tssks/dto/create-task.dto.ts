export class CreateTaskDto {
  readonly title: string;
  readonly order: number;
  readonly description: string;
  readonly userId: string | null;
  readonly boardId: string;
  readonly columnId: string;
}
