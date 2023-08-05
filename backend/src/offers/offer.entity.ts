import {
  CreateDateColumn,
  Column,
  JoinColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../users/user.entity'
import { IsNotEmpty, IsBoolean } from 'class-validator'
import { Wish } from '../wishes/wish.entity'

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Wish)
  @JoinColumn()
  item: Wish;

  @Column()
  @IsNotEmpty()
  amount: number;

  @Column()
  @IsBoolean()
  hidden: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.offers)
  @JoinColumn()
  user: User;
}
