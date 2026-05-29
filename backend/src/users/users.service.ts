import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from "bcrypt"

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: CreateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email : data.email
            }
        })

        if(existingUser) {
            throw new BadRequestException("User already exists");
        }

        const hashPassword = await bcrypt.hash(data.password,10);

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashPassword,
                role: data.role
            }
        });

        return {
            message: "User created successfully",
            user
        }
    }
}
