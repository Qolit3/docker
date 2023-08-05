import {
  CreateDateColumn,
  Column,
  JoinTable,
  Entity,
  ManyToOne,
  ManyToMany,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'
import {
  IsOptional,
  IsNotEmpty,
  Length,
  IsUrl
} from 'class-validator'

import { Wish } from '../wishes/wish.entity'
import { User } from '../users/user.entity'

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 250)
  name: string;

  @Column()
  @Length(0, 1500)
  @IsOptional()
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @ManyToMany(() => Wish, (wish) => wish.id)
  @JoinTable()
  items: Wish[];
}
