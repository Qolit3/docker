import {
  CreateDateColumn,
  Column,
  OneToMany,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import {
  IsEmail,
  IsNotEmpty,
  IsUrl,
  Length
} from 'class-validator'

import { Wish } from '../wishes/wish.entity'
import { Exclude } from 'class-transformer'
import { Wishlist } from '../wishlists/wishlist.entity'
import { Offer } from '../offers/offer.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @IsNotEmpty()
  @Length(2, 200)
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300'})
  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Wish, (wish) => wish.owner, { eager: true })
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user, { eager: true })
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner, {
    eager: true,
  })
  wishlists: Wishlist[];

  @Column()
  @Exclude()
  password: string;
}
