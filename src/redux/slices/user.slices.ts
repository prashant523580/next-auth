import {createSlice,CreateSliceOptions} from "@reduxjs/toolkit"
import type {PayloadAction} from "@reduxjs/toolkit"
interface UserTypes {
    name :string,
  email: string,
}
interface StateProps {
    user: UserTypes;
}
const initialState: UserTypes = {
   email: '',
   name:''

}
const userSlice  = createSlice({
        name:"user",
        initialState,
        reducers:{
            credentialLogin(state :any, action: PayloadAction){
                    state =  action.payload
                    // state.name = action.payload.name
            }
        }
        
})
export const {credentialLogin} = userSlice.actions
export default userSlice.reducer