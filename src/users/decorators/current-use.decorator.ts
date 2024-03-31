import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { constants } from 'buffer';
import { create } from 'domain';
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
