import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    const user = await this.usersService.getOneById(id);
    const result = {
      name: user.name,
      login: user.login,
      id: user.id,
    };
    return result;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user: User = await this.usersService.addNew(createUserDto);
    const result = {
      name: user.name,
      login: user.login,
      id: user.id,
    };
    return result;
  }

  @Put(':id')
  async update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.usersService.delete(id);
    return;
  }
}
