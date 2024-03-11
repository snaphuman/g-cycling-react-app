import  { type ReactNode, createContext, useContext, useReducer} from 'react';

type StravaState = {
    isLoggedIn?: boolean;
    isAdmin?: boolean;
    token?: string;
}

type StravaContextValue = StravaState & {
    setToken: (token: string) => void;
    removeToken: () => void;
}

type StravaContextProviderProps = {
    children: ReactNode;
}

type SetTokenAction = {
    payload?: Partial<StravaState> 
    type: 'SET_TOKEN',
}

type RemoveTokenAction = {
    type: 'REMOVE_TOKEN',
}

type Action = SetTokenAction | RemoveTokenAction;

const StravaContext = createContext<StravaContextValue | null>(null);
const initialState: StravaState = {
    isLoggedIn: false,
    isAdmin: false,
    token: undefined,
}

export function useStravaContext() {
    const stravaCtx = useContext(StravaContext)

    if(stravaCtx === null) {
        throw new Error('Unexpected error');
    }

    return stravaCtx;
}

function stravaReducer(state: StravaState, action: Action) {

    if (action.type === 'SET_TOKEN') {
        return {
            ...state,
            isLoggedIn: true,
            token: action.payload?.token,
        }
    }
    if (action.type === 'REMOVE_TOKEN') {
        return {
            ...state,
            isLoggedIn: false,
            isAdmin: false,
            token: undefined,
        }
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
            dispatch({type: 'SET_TOKEN', payload: {token}}) 
        },
        removeToken: () => {
            dispatch({type: 'REMOVE_TOKEN'})
        }
    }

    return <StravaContext.Provider value={ctx}>{children}</StravaContext.Provider>
}

export default StravaContextProvider;