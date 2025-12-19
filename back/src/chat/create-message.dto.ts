import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMessageDTO {
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  chatId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  content: string;
}
