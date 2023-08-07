import {
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length
} from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Offer } from '../offers/offer.entity'
import { User } from '../users/user.entity'

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 250)
  name: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 1024)
  description: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'decimal', scale: 2 })
  @IsNotEmpty()
  price: number;

  @Column()
  @IsNotEmpty()
  @IsOptional()
  raised: number;

  @Column({ type: 'decimal'})
  @IsOptional()
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn()
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
}
