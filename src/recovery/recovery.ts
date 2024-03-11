import { UserDetails } from 'src/utils/types'
import { ConfirmRecoveryDto } from './dto/ConfirmRecovery.dto'

export interface IRecoveryService {
    sendRecoveryMail(userDetails: UserDetails): Promise<string>
    confirmRecoveryCode(confirmRecoveryDto: ConfirmRecoveryDto): Promise<string>
}
