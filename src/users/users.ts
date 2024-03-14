import { History } from 'src/database/typeorm/entities/History'
import { User } from 'src/database/typeorm/entities/User'
import { FundInDetails, UserDetails } from 'src/utils/types'
import { FundInDto } from './dto/FundIn.dto'
import { RecoveryPasswordDto } from './dto/RecoveryPassword.dto'
import { RegisterDto } from './dto/Register.dto'

export interface IUsersService {
    findUserByEmail(userDetails: UserDetails): Promise<User>
    createUser(registerDto: RegisterDto): Promise<User>
    updateUser(userDetails: UserDetails): Promise<User>
    changePassword(userDetails: UserDetails): Promise<User>
    recoveryPassword(recoveryPasswordDto: RecoveryPasswordDto): Promise<User>
    fundIn(fundInDto: FundInDto): Promise<FundInDto>
    handlefundIn(fundInDetails: FundInDetails): Promise<FundInDto>
    getFundInRequests(): Promise<History[]>
}
