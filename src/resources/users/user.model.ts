import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { IUser, IUserWoPassword } from "./models/user.model";
import { Task } from '../tasks/task.model';

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column()
    login!: string;

    @Column()
    password!: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks!: string;
}
