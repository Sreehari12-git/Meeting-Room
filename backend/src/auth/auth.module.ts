import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';

@Module({
  imports : [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

