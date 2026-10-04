import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  IdUser: number;

  @Column({ length: 255 })
  UserName: string;

  @Column({ length: 255 })
  Password: string;

  @Column({ length: 255, nullable: true })
  Token: string;
}