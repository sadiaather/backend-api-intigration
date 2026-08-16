export const initialState = {
	user: {},
	isLoggedIn: false,
	darkTheme: true,
}


export const reducer = (state, action) => {
	switch (action.type) {

        case 'USER_LOGIN': {
		
			return { ...state,
				 user: action.payload ,
				  isLoggedIn:true};

			


		}
		case 'USER_LOGOUT': {
			return { ...state, user: null, isLoggedIn:false };
		}
		case 'CHANGE_THEME': {
			return { ...state, darkTheme: !state.darkTheme };
		}
		default: {
			return state;
		}
	}
};