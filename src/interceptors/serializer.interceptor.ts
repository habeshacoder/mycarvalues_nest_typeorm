import {
  UseInterceptors,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { GetUserDto } from 'src/users/dtos/get-user.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export class SerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(GetUserDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}