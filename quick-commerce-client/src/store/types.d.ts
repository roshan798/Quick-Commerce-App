import { User } from "../types"

export type UserState = {
    user: User | null
}


export type RootState = {
    auth: UserState
}
