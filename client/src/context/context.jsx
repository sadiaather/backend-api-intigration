import React, { createContext, useReducer } from 'react';
import { reducer,initialState } from '../reducer/reducer.jsx';
export const GlobalContext = createContext('Initial Value');

export default function ContextProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	 return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
}