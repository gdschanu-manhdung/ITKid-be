import { History } from 'src/database/typeorm/entities/History'
import { User } from 'src/database/typeorm/entities/User'
import { FundInDetails, UserDetails } from 'src/utils/types'
import { FundInDto } from './dto/FundIn.dto'
import { RecoveryPasswordDto } from './dto/RecoveryPassword.dto'
import { RegisterDto } from './dto/Register.dto'
import { SearchQueryDto } from './dto/SearchQuery.dto'
import { UpdateUserDto } from './dto/UpdateUser.dto'

export interface IUsersService {
    findUserByEmail(userDetails: UserDetails): Promise<User>
    createUser(registerDto: RegisterDto): Promise<User>
    updateUser(updateUserDto: UpdateUserDto): Promise<User>
    changePassword(userDetails: UserDetails): Promise<User>
    recoveryPassword(recoveryPasswordDto: RecoveryPasswordDto): Promise<User>
    requestFundIn(fundInDto: FundInDto): Promise<FundInDto>
    handlefundIn(fundInDetails: FundInDetails): Promise<FundInDto>
    getFundInRequests(): Promise<History[]>
    increasePoint(userDetails: UserDetails): Promise<User>
    getUserRankings(userDetails: UserDetails): Promise<number>
    getFullRankings(): Promise<User[]>
    getUsers(): Promise<User[]>
    getUserById(userDetails: UserDetails): Promise<User>
    getUsersByString(searchQueryDto: SearchQueryDto): Promise<User[]>
}
