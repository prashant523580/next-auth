import { createSlice, CreateSliceOptions } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
interface UserTypes {
        _id:string,
        email: string,
        password: string,
        phone?: string,
        firstname?: string,
        lastname?: string,
        cpassword?: string
}
interface StateProps {
        user: UserTypes;
        authenticate?: boolean,
        error?: boolean,
        token: any,
}
const initialState: StateProps = {
        user:{

                _id:'',
                email: '',
                password: '',
                cpassword: "",
                firstname: "",
                lastname: '',
                phone: ''
        },
        token:null,
        authenticate: false,
        error : false

}
const userSlice = createSlice({
        name: "user",
        initialState,
        reducers: {
                credentialLogin(state, action: PayloadAction<any>) {
                        state.user = action.payload.payload.user
                        state.token = action.payload.payload.token
                        state.authenticate= true
                        // state.name = action.payload.name
                },
                credentialRegister(state, action: PayloadAction<any>) {
                        state.user = action.payload.payload
                        
                },credentialLogout(state, action: PayloadAction<any>){
                        state = state
                }

        }

})

export const { credentialLogin, credentialRegister } = userSlice.actions
export default userSlice.reducer