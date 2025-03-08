import { Cart, User } from "../types"

export type UserState = {
    user: User | null
}


export type RootState = {
    auth: UserState,
    cart : CartState
}

export type CartState = {
    cart : Cart | null
}