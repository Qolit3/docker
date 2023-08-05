import {
  IsNotEmpty,
  IsArray,
  IsUrl,
  IsOptional,
  Length,
} from 'class-validator'

export class CreateWishlistDto {
  @Length(0, 250)
  @IsNotEmpty()
  name: string;

  @IsUrl()
  image: string;

  @IsOptional()
  @Length(0, 1500)
  description: string;

  @IsArray()
  itemsId: Array<number>;
}
