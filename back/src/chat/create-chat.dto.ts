import { IsString, IsMongoId, IsOptional, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class CreateChatDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  participants?: Types.ObjectId[];

  @IsOptional()
  @IsMongoId()
  admin?: string;
}
