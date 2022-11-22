import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
	data: {},
	isChanged: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialUserState,
	reducers: {
		set(state, action) {
			state.data = action.payload;
			state.isChanged = true;
		},
		reset(state) {
			state.data = {};
			state.isChanged = false;
		},
	},
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
