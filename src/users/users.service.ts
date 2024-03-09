import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/database/typeorm/entities/User'
import { UserDetails } from 'src/utils/types'
import { Repository } from 'typeorm'
import { IUsersService } from './users'

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
}
