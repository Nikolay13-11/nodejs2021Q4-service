import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IUser, IUserWoPassword } from "./models/user.model";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    login: string;

    @Column()
    password: string;

    // @OneToMany(() => Task, (task) => task.userId)
    // tasks!: string;

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}){
    super()
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser):IUserWoPassword {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
