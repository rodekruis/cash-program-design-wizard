import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt = require('jsonwebtoken');

export const User = createParamDecorator(
  (_data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const authHeaders = request.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id;
    }
  },
);
