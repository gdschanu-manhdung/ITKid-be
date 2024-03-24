import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/database/typeorm/entities/User'
import { FundInDetails, UserDetails } from 'src/utils/types'
import { Like, Repository } from 'typeorm'
import { IUsersService } from './users'
import { HttpException, HttpStatus } from '@nestjs/common'
import { RegisterDto } from './dto/Register.dto'
import {
    bigIntTime,
    compareHash,
    generateRandomFundInCode,
    hashPassword
} from 'src/utils/helper'
import { ChangePasswordDto } from './dto/ChangePassword.dto'
import { RecoveryPasswordDto } from './dto/RecoveryPassword.dto'
import { FundInDto } from './dto/FundIn.dto'
import { History } from 'src/database/typeorm/entities/History'
import { FundInEnum } from 'src/utils/constants'
import { SearchQueryDto } from './dto/SearchQuery.dto'
import { UpdateUserDto } from './dto/UpdateUser.dto'

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
            const user = await this.userRepository.findOne({
                where: { id: userDetails.id }
            })

            const editedUser = {
                ...user,
                name: userDetails.name,
                dob: userDetails.dob,
                phone: userDetails.phone
            }

            console.log(userDetails, user)

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

    async requestFundIn(fundInDto: FundInDto) {
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
                status: FundInEnum.PENDING,
                createdAt: bigIntTime(),
                code: generateRandomFundInCode()
            }
            const fund = this.historyRepository.create(fundInDetails)
            return await this.historyRepository.save(fund)
        } catch (error) {
            console.error(error)
        }
    }

    async handlefundIn(fundInDetails: FundInDetails) {
        try {
            const fundRequest = await this.historyRepository.findOne({
                where: { email: fundInDetails.email }
            })

            if (!fundRequest) {
                throw new HttpException(
                    'Invalid fund request',
                    HttpStatus.NOT_FOUND
                )
            }

            if (
                fundInDetails.code === fundRequest.code &&
                (bigIntTime() - fundRequest.createdAt) / 1000 <= 10 * 60
            ) {
                const updatedRequest = {
                    ...fundRequest,
                    status: FundInEnum.SUCCESS
                }

                return await this.historyRepository.save(updatedRequest)
            } else {
                const updatedRequest = {
                    ...fundRequest,
                    status: FundInEnum.FAILED
                }

                return await this.historyRepository.save(updatedRequest)
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

    async increasePoint(userDetails: UserDetails) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userDetails.id }
            })

            if (!user) {
                throw new HttpException('Wrong index', HttpStatus.UNAUTHORIZED)
            }

            const updatedUser = {
                ...user,
                points: user.points + 10
            }

            return await this.userRepository.save(updatedUser)
        } catch (error) {
            console.error(error)
        }
    }

    async getUserRankings(userDetails: UserDetails) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userDetails.id }
            })

            if (!user) {
                throw new HttpException('Wrong index', HttpStatus.UNAUTHORIZED)
            }

            const userRankings = await this.userRepository.find({
                order: {
                    points: 'DESC'
                }
            })

            const index = userRankings.findIndex(
                (userRanking) => userRanking.id === user.id
            )

            return index + 1
        } catch (error) {
            console.error(error)
        }
    }

    async getFullRankings() {
        try {
            const userRankings = await this.userRepository.find({
                order: {
                    points: 'DESC'
                }
            })

            return userRankings
        } catch (error) {
            console.error(error)
        }
    }

    async getUsers() {
        try {
            return await this.userRepository.find()
        } catch (error) {
            console.error(error)
        }
    }

    async getUserById(userDetails: UserDetails) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userDetails.id }
            })

            return user
        } catch (error) {
            console.error(error)
        }
    }

    async getUsersByString(searchQueryDto: SearchQueryDto) {
        try {
            const searchQuery = searchQueryDto.searchQuery as string

            const users = await this.userRepository.find({
                where: [
                    { email: Like(`%${searchQuery}%`) },
                    { name: Like(`%${searchQuery}%`) }
                ]
            })

            return users
        } catch (error) {
            console.error(error)
        }
    }
}
