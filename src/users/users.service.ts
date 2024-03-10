import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/database/typeorm/entities/User'
import { UserDetails } from 'src/utils/types'
import { Repository } from 'typeorm'
import { IUsersService } from './users'
import { HttpException, HttpStatus } from '@nestjs/common'
import { RegisterDto } from './dto/Register.dto'
import { hashPassword } from 'src/utils/helper'

export class UsersService implements IUsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async findUserByEmail(userDetails: UserDetails) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email: userDetails.email
                }
            })

            return user
        } catch (error) {
            console.error(error)
        }
    }

    async createUser(registerDto: RegisterDto) {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { email: registerDto.email }
            })

            if (existingUser) {
                throw new HttpException('Email is existed', HttpStatus.CONFLICT)
            }

            const userDetails = {
                ...registerDto,
                wallet: 0,
                points: 0,
                password: await hashPassword(registerDto.password)
            } as UserDetails

            const user = this.userRepository.create(userDetails)
            return await this.userRepository.save(user)
        } catch (error) {
            console.error(error)
        }
    }

    async updateUser(userDetails: UserDetails) {
        try {
            const user = await this.findUserByEmail(userDetails)

            const editedUser = {
                ...user,
                name: userDetails.name,
                dob: userDetails.dob,
                phone: userDetails.phone
            }

            return await this.userRepository.save(editedUser)
        } catch (error) {
            console.error(error)
        }
    }
}
