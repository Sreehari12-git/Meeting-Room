import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async login(email: string,password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const match = await bcrypt.compare(password,user.password);

        if(!match) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET as string, {
                expiresIn: "10d"
            }
        )
        return {
            message: "Login success",
            token
        }
    }
}

