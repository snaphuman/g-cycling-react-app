import  { type ReactNode, createContext, useContext, useReducer} from 'react';

type StravaState = {
    isLoggedIn?: boolean;
    isAdmin?: boolean;
    token?: string;
}

type StravaContextValue = StravaState & {
    setToken: (token: string) => void;
}

type StravaContextProviderProps = {
    children: ReactNode;
}

const StravaContext = createContext<StravaContextValue | null>(null);

const initialState: StravaState = {
    isLoggedIn: undefined,
    isAdmin: undefined,
    token: undefined,
}

type SetTokenAction = {
    type: 'SET_TOKEN',
}

type Action = {
    payload?: Partial<StravaState> 
    
} & SetTokenAction;




export function useStravaContext() {
    const stravaCtx = useContext(StravaContext)

    if(stravaCtx === null) {
        throw new Error('Unexpected error');
    }

    return stravaCtx;
}

function stravaReducer(state: StravaState, action: Action) {

    if (action.type === 'SET_TOKEN') {
        const newState =  {
            ...state,
            isLoggedIn: true,
            token: action.payload?.token,
        }

        return newState
    }

    return state;

};

const StravaContextProvider = ({children}: StravaContextProviderProps) => {

    const [stravaState, dispatch] = useReducer(stravaReducer, initialState);

    const ctx: StravaContextValue = {
        isAdmin: stravaState.isAdmin,
        isLoggedIn: stravaState.isLoggedIn,
        token: stravaState.token,
        setToken: (token) => {
            dispatch({type: 'SET_TOKEN', payload: {token: token}}) 
        } 
    }

    return <StravaContext.Provider value={ctx}>{children}</StravaContext.Provider>
}

export default StravaContextProvider;