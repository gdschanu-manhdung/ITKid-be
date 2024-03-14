import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/database/typeorm/entities/User'
import { FundInDetails, UserDetails } from 'src/utils/types'
import { Repository } from 'typeorm'
import { IUsersService } from './users'
import { HttpException, HttpStatus } from '@nestjs/common'
import { RegisterDto } from './dto/Register.dto'
import { compareHash, hashPassword } from 'src/utils/helper'
import { ChangePasswordDto } from './dto/ChangePassword.dto'
import { RecoveryPasswordDto } from './dto/RecoveryPassword.dto'
import { FundInDto } from './dto/FundIn.dto'
import { History } from 'src/database/typeorm/entities/History'
import { FundInEnum } from 'src/utils/constants'

export class UsersService implements IUsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(History)
        private readonly historyRepository: Repository<History>
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

    async changePassword(changePasswordDto: ChangePasswordDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: changePasswordDto.email }
            })

            const isPasswordValid = await compareHash(
                changePasswordDto.oldPassword,
                user.password
            )

            if (!isPasswordValid) {
                throw new HttpException(
                    'Wrong old password',
                    HttpStatus.UNAUTHORIZED
                )
            }

            const editedUser = {
                ...user,
                password: await hashPassword(changePasswordDto.newPassword)
            }

            return await this.userRepository.save(editedUser)
        } catch (error) {
            console.error(error)
        }
    }

    async recoveryPassword(recoveryPasswordDto: RecoveryPasswordDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: recoveryPasswordDto.email }
            })

            const recoveryUser = {
                ...user,
                password: await hashPassword(recoveryPasswordDto.password)
            }

            return await this.userRepository.save(recoveryUser)
        } catch (error) {
            console.error(error)
        }
    }

    async fundIn(fundInDto: FundInDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: fundInDto.email }
            })

            if (!user) {
                throw new HttpException('Wrong user', HttpStatus.UNAUTHORIZED)
            }

            if (fundInDto.amount <= 0) {
                throw new HttpException(
                    'Invalid amount',
                    HttpStatus.NOT_ACCEPTABLE
                )
            }

            const fundInDetails = {
                ...fundInDto,
                status: FundInEnum.PENDING
            }
            const fund = this.historyRepository.create(fundInDetails)
            return await this.historyRepository.save(fund)
        } catch (error) {
            console.error(error)
        }
    }

    async handlefundIn(fundInDetails: FundInDetails) {
        try {
            if (!fundInDetails.id) {
                throw new HttpException('Wrong index', HttpStatus.BAD_REQUEST)
            }

            const fundRequest = await this.historyRepository.findOne({
                where: { id: fundInDetails.id }
            })

            if (!fundRequest) {
                throw new HttpException('Invalid request', HttpStatus.NOT_FOUND)
            }

            const user = await this.userRepository.findOne({
                where: { email: fundRequest.email }
            })

            if (!user) {
                const fund = {
                    ...fundRequest,
                    status: FundInEnum.FAILED
                }

                return await this.historyRepository.save(fund)
            } else {
                const fund = {
                    ...fundRequest,
                    status: FundInEnum.SUCCESS
                }

                const updatedUser = {
                    ...user,
                    wallet: user.wallet + fund.amount / 100
                }
                await this.userRepository.save(updatedUser)
                return await this.historyRepository.save(fund)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getFundInRequests() {
        try {
            const requests = await this.historyRepository.find()

            return requests
        } catch (error) {
            console.error(error)
        }
    }
}
