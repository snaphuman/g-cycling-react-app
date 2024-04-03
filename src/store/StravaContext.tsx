import  { type ReactNode, createContext, useContext, useReducer} from 'react';
import { Athlete, AthleteActivity, ClubActivity } from '../models/StravaModels';
import { StravaApi } from '../enums/StravaApi';

type StravaState = {
    isLoggedIn?: boolean;
    isAdmin?: boolean;
    isGlober?: boolean;
    token?: string;
    loggedInAthlete?: Athlete;
    clubActivities?: ClubActivity[];
    athleteActivities?: AthleteActivity[];
}

type StravaContextValue = StravaState & {
    setToken: (token: string) => void;
    removeToken: () => void;
    setAthlete: (athlete: Athlete) => void;
    setClubActivities: (activities: ClubActivity[]) => void;
    setAthleteActivities: (activities: AthleteActivity[]) => void;
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
    payload?: Partial<StravaState>,
    type: 'SET_ATHLETE',
}

type SetClubActivitiesAction = {
    payload?: Partial<StravaState>,
    type: 'SET_ACTIVITIES',
}

type SetAthleteActivitiesAction = {
    payload?: Partial<StravaState>,
    type: 'SET_ATHLETE_ACTIVITIES',
}

type Action = SetTokenAction | RemoveTokenAction | SetAthleteAction | SetClubActivitiesAction | SetAthleteActivitiesAction;

const StravaContext = createContext<StravaContextValue | null>(null);
const initialState: StravaState = {
    isLoggedIn: false,
    isAdmin: false,
    isGlober: false,
    token: undefined,
    loggedInAthlete: new Athlete(), 
    clubActivities: undefined,
}

export function useStravaContext() {
    const stravaCtx = useContext(StravaContext)

    if(stravaCtx === null) {
        throw new Error('Unexpected error');
    }

    return stravaCtx;
}

function stravaReducer(state: StravaState, action: Action) {

    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload?.token,
            }
        case 'REMOVE_TOKEN':
            return {
                ...state,
                isLoggedIn: false,
                isAdmin: false,
                token: undefined,
            }
        case 'SET_ATHLETE':
            return {
                ...state,
                isGlober: athleteBelongsToClub(StravaApi.CLUB_ID as unknown as number, state.loggedInAthlete?.clubs),
                loggedInAthlete: action.payload?.loggedInAthlete,
            }
        case 'SET_ACTIVITIES':
            return {
                ...state,
                clubActivities: action.payload?.clubActivities 
            }
        case 'SET_ATHLETE_ACTIVITIES':
            return {
                ...state,
                athleteActivities: action.payload?.athleteActivities, 
            }
    }

    return state;
};

const athleteBelongsToClub = (clubId: number, clubs?: any[])  => {
    return clubs?.find((club) => club.id == clubId) ? true : false;
}


const StravaContextProvider = ({children}: StravaContextProviderProps) => {

    const [stravaState, dispatch] = useReducer(stravaReducer, initialState);

    const ctx: StravaContextValue = {
        isAdmin: stravaState.isAdmin,
        isLoggedIn: stravaState.isLoggedIn,
        isGlober: stravaState.isGlober,
        token: stravaState.token,
        loggedInAthlete: stravaState.loggedInAthlete,
        clubActivities: stravaState.clubActivities,
        athleteActivities: stravaState.athleteActivities,
        setToken: (token) => {
            dispatch({type: 'SET_TOKEN', payload: {token}}) 
        },
        removeToken: () => {
            dispatch({type: 'REMOVE_TOKEN'})
        },
        setAthlete: (athlete) => {
            dispatch({type: 'SET_ATHLETE', payload: {loggedInAthlete: athlete}})
        },
        setClubActivities: (activities) => {
            dispatch({type: 'SET_ACTIVITIES', payload: { clubActivities: activities}})
        },
        setAthleteActivities: (activities) => {
            dispatch({type: 'SET_ATHLETE_ACTIVITIES', payload: { athleteActivities: activities}})
        }
    }

    return <StravaContext.Provider value={ctx}>{children}</StravaContext.Provider>
}

export default StravaContextProvider;