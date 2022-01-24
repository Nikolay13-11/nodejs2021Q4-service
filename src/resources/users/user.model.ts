import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
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
