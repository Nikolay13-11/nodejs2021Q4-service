import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateHash } from 'src/common/helper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    this.addAdmin();
  }
  async getAll(): Promise<User[]> {
    const allUsers = await this.usersRepository.find();
    return allUsers;
  }
  async getOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      return user;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
  async getOneByName(name: string): Promise<User> {
    const user = await this.usersRepository.findOne({ name: name });
    return user;
  }
  async addNew(user: CreateUserDto): Promise<User> {
    const password = await generateHash(user.password);
    user.password = password;
    const newUser = await this.usersRepository.create({ ...user });
    await this.usersRepository.save(newUser);
    return newUser;
  }
  async update(
    id: string,
    user: UpdateUserDto,
  ): Promise<User | Partial<User> | Error> {
    const password = await generateHash(user.password);
    user.password = password;
    await this.usersRepository.update(id, user);
    return await this.getOneById(id);
  }
  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
    return;
  }

  async addAdmin() {
    const adminUser = await this.getOneByName('admin');
    if (!adminUser) {
      this.addNew({
        name: 'admin',
        login: 'admin',
        password: 'admin',
      });
    }
  }
}
