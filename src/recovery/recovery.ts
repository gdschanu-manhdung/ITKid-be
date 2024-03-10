import { UserDetails } from 'src/utils/types'

export interface IRecoveryService {
    sendRecoveryMail(userDetails: UserDetails): Promise<string>
}
