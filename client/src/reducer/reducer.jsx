export const initialState = {
	user: {},
	isLoggedIn: false,
	darkTheme: true,
};

export const reducer = (state, action) => {
	switch (action.type) {
        case 'USER_LOGIN': {
			initialState.isLoggedIn  = true
            console.log(action.payload)
			return { ...state, user: action.payload };


		}
		case 'USER_LOGOUT': {
			return { ...state, user: null };
		}
		case 'CHANGE_THEME': {
			return { ...state, darkTheme: !state.darkTheme };
		}
		default: {
			return state;
		}
	}
};