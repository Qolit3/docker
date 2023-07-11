import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany
} from "typeorm";
import {
  IsEmail,
  IsUrl,
  MaxLength,
  Length,
} from "class-validator"
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";


@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @Column()
  @MaxLength(1500)
  description: string;

  @Column()
  image: string;

  @Column()
  @ManyToMany(() => Wish, (wish) => wish.name)
  items: Wish[]
}
