import { IsNotEmpty, IsOptional, IsUrl, Length, Min } from 'class-validator'
import { Column } from 'typeorm'

export class UpdateWishDto {
  @Column()
  @IsNotEmpty()
  @IsOptional()
  @IsOptional()
  @Length(1, 250)
  name: string;

  @Column()
  @IsOptional()
  @Length(1, 1024)
  @IsNotEmpty()
  description: string;

  @Column()
  @IsUrl()
  @IsOptional()
  @IsNotEmpty()
  link: string;

  @Column()
  @IsNotEmpty()
  @IsOptional()
  @IsUrl()
  image: string;

  @Column({ type: 'decimal', scale: 2, default: 1 })
  @IsNotEmpty()
  @IsOptional()
  @Min(1)
  price: number;
}
