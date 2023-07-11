import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  ManyToOne,
  OneToOne
} from "typeorm";
import {
  IsEmail,
  IsUrl,
  Length,
} from "class-validator"
import { User } from "src/users/entities/user.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
import { Offer } from "src/offers/entities/offer.entity";


@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  name: string;

  @Column()
  @OneToOne(() => Offer, offer => offer.item)
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({
    precision: 2
  })
  price: number;

  @Column( {
    precision: 2
  })
  raised: number;
  
  @Column()
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column()
  @ManyToMany(() => User, (user) => user.offers)
  @JoinTable()
  offers: string[];

  @Column()
  copied: number;
}
