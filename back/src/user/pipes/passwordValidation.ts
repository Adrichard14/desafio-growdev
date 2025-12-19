import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PasswordConfirmPipe implements PipeTransform {
  transform(value: { password: string; confirmPassword: string }) {
    if (value.password !== value.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return value;
  }
}
