import  { type ReactNode, createContext, useContext, useReducer} from 'react';
import Athlete from '../models/Athlete';

type StravaState = {
    isLoggedIn?: boolean;
    isAdmin?: boolean;
    token?: string;
    loggedInAthlete?: Athlete;
}

type StravaContextValue = StravaState & {
    setToken: (token: string) => void;
    removeToken: () => void;
    setAthlete: (athlete: Athlete) => void;
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

type SetAthleteAction = {
    payload?: Partial<StravaState> 
    type: 'SET_ATHLETE',
}


type Action = SetTokenAction | RemoveTokenAction | SetAthleteAction;

const StravaContext = createContext<StravaContextValue | null>(null);
const initialState: StravaState = {
    isLoggedIn: false,
    isAdmin: false,
    token: undefined,
    loggedInAthlete: new Athlete(), 
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
    if (action.type === 'SET_ATHLETE') {
        return {
            ...state,
            loggedInAthlete: action.payload?.loggedInAthlete,
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
        loggedInAthlete: stravaState.loggedInAthlete,
        setToken: (token) => {
            dispatch({type: 'SET_TOKEN', payload: {token}}) 
        },
        removeToken: () => {
            dispatch({type: 'REMOVE_TOKEN'})
        },
        setAthlete: (athlete) => {
            dispatch({type: 'SET_ATHLETE', payload: {loggedInAthlete: athlete}})
        }
    }

    return <StravaContext.Provider value={ctx}>{children}</StravaContext.Provider>
}

export default StravaContextProvider;