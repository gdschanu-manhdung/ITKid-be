import { User } from 'src/database/typeorm/entities/User'
import { LoginDto } from './dto/login.dto'

export interface IAuthService {
    validateUser(loginDto: LoginDto): Promise<User>
}
