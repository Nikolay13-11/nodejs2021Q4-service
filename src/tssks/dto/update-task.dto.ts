import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  userId?: string | null;

  @IsString()
  @IsOptional()
  boardId?: string;

  @IsString()
  @IsOptional()
  columnId?: string;
}
