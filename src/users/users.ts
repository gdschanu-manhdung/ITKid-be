import { User } from 'src/database/typeorm/entities/User'
import { UserDetails } from 'src/utils/types'

export interface IUsersService {
    findUserByEmail(userDetails: UserDetails): Promise<User>
}
