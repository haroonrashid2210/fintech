import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../../../../src/users/schemas';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) =>
  getCurrentUserByContext(context),
);
