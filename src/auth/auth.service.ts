import { HttpException, HttpStatus, Inject } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { Services } from 'src/utils/constants'
import { UserDetails } from 'src/utils/types'
import { IAuthService } from './auth'
import { LoginDto } from './dto/Login.dto'
import { compareHash } from 'src/utils/helper'

export class AuthService implements IAuthService {
    constructor(
        @Inject(Services.USERS) private readonly usersService: UsersService
    ) {}

    async validateUser(loginDto: LoginDto) {
        const userDetails = {
            ...loginDto
        } as UserDetails

        try {
            const user = await this.usersService.findUserByEmail(userDetails)

            if (!user) {
                throw new HttpException('Wrong Email', HttpStatus.UNAUTHORIZED)
            }

            const isPasswordValid = await compareHash(
                userDetails.password,
                user.password
            )

            if (!isPasswordValid) {
                throw new HttpException(
                    'Wrong Password',
                    HttpStatus.UNAUTHORIZED
                )
            }

            return user
        } catch (error) {
            console.error(error)
        }
    }
}
