import { Transform } from 'class-transformer'
import { IsOptional, IsUrl, Length } from 'class-validator'

export class CreateWishDto {
  @Length(1, 250)
  name: string;

  @IsUrl()
  image: string;

  @IsUrl()
  link: string;

  @Transform(({ value }) => Number.parseFloat(value).toFixed(2))
  price: number;

  @IsOptional()
  description: string;
}
