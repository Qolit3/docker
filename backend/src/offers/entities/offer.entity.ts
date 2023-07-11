import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";


@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  
  @Column()
  @OneToOne(() => Wish)
  @JoinColumn()
  item: Wish;

  @Column({
    precision: 2
  })
  amount: number

  @Column({
    default: false
  })
  hidden: boolean
}
