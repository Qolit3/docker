import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  OneToOne
} from "typeorm";
import {
  IsEmail,
  Length,
} from "class-validator"
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { Offer } from "src/offers/entities/offer.entity";



@Entity()
export class User {

  @PrimaryGeneratedColumn()
  @OneToOne(() => Offer, offer => offer.user)
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false
  })
  @Length(2, 30)
  username: string;

  @Column({
    type: 'varchar',
    default: 'Пока ничего не рассказал о себе'
  })
  @Length(2, 200)
  about: string;

  @Column( {
    type: 'varchar',
    default: 'https://i.pravatar.cc/300'
  })
  avatar: string;

  @Column({
    type: "varchar",
    unique: true
  })
  @IsEmail()
  email: string;
  
  @Column()
  password: string;
  
  @Column()
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @Column()
  @ManyToMany(() => Wish, (wish) => wish.offers)
  offers: Wish[];

  @Column()
  @OneToMany(() => Wishlist, (wishlist) => wishlist.name)
  wishlists: Wishlist[];
}
