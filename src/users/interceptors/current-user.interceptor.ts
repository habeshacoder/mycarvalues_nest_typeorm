import {
  UseInterceptors,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptors implements NestInterceptor {
  constructor(private userService: UsersService) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    //handle  incoming request
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;
    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
    }
    //jhandle outgoing responses
    return handler.handle();
  }
}
