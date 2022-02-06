import { IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  columns?: IColumns[];
}

interface IColumns {
  readonly id: string;
  readonly title: string;
  readonly order: string;
}
