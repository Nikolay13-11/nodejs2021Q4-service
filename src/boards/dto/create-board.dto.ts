export class CreateBoardDto {
  readonly title: string;
  readonly columns: IColumns[];
}

interface IColumns {
  readonly title: string;
  readonly order: string;
}
