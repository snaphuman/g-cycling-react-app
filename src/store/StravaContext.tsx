import  { type ReactNode, createContext, useContext, useReducer} from 'react';
import { ActivityStats, Athlete, AthleteActivity, ClubActivity } from '../models/StravaModels';

type StravaState = {
    isLoggedIn?: boolean;
    isAdmin?: boolean;
    isGlober?: boolean;
    token?: string;
    loggedInAthlete?: Athlete;
    clubActivities?: ClubActivity[];
    athleteActivities?: AthleteActivity[];
    activityStats?: ActivityStats;
}

type StravaContextValue = StravaState & {
    setToken: (token: string) => void;
    removeToken: () => void;
    setAthlete: (athlete: Athlete, isGlober?: boolean) => void;
    setActivityStats: (stats: ActivityStats) => void;
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

type SetActivityStatsAction = {
    payload?: Partial<StravaState>,
    type: 'SET_ACTIVITY_STATS',
}

type SetClubActivitiesAction = {
    payload?: Partial<StravaState>,
    type: 'SET_CLUB_ACTIVITIES',
}

type SetAthleteActivitiesAction = {
    payload?: Partial<StravaState>,
    type: 'SET_ATHLETE_ACTIVITIES',
}

type Action = SetTokenAction 
            | RemoveTokenAction 
            | SetAthleteAction 
            | SetActivityStatsAction 
            | SetClubActivitiesAction 
            | SetAthleteActivitiesAction;

const StravaContext = createContext<StravaContextValue | null>(null);
const initialState: StravaState = {
    isLoggedIn: false,
    isAdmin: false,
    isGlober: false,
    token: undefined,
    loggedInAthlete: new Athlete(), 
    clubActivities: undefined,
    activityStats: undefined,
}

export function useStravaContext() {
    const stravaCtx = useContext(StravaContext)

    if(stravaCtx === null) {
        throw new Error('Unexpected error');
    }

    return stravaCtx;
}

function stravaReducer(state: StravaState, action: Action): StravaState {

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
                isGlober: action.payload?.isGlober,
                loggedInAthlete: {...state.loggedInAthlete, ...action.payload?.loggedInAthlete}
            }
        case 'SET_ACTIVITY_STATS':
            return {
                ...state,
                activityStats: action.payload?.activityStats
            }
        case 'SET_CLUB_ACTIVITIES':
            return {
                ...state,
                clubActivities: action.payload?.clubActivities,
            }
        case 'SET_ATHLETE_ACTIVITIES':
            return {
                ...state,
                athleteActivities: action.payload?.athleteActivities
            }
    }

    return state;
};

const StravaContextProvider = ({children}: StravaContextProviderProps) => {

    const [stravaState, dispatch] = useReducer(stravaReducer, initialState);

    const ctx: StravaContextValue = {
        isAdmin: stravaState.isAdmin,
        isLoggedIn: stravaState.isLoggedIn,
        isGlober: stravaState.isGlober,
        token: stravaState.token,
        loggedInAthlete: stravaState.loggedInAthlete,
        clubActivities: stravaState.clubActivities,
        activityStats: stravaState.activityStats,
        athleteActivities: stravaState.athleteActivities,
        setToken: (token) => {
            dispatch({type: 'SET_TOKEN', payload: {token}}) 
        },
        removeToken: () => {
            dispatch({type: 'REMOVE_TOKEN'})
        },
        setAthlete: (athlete, isGlober?: boolean) => {
            dispatch({type: 'SET_ATHLETE', payload: {loggedInAthlete: athlete, isGlober: isGlober}})
        },
        setActivityStats: (stats) => {
            dispatch({type: 'SET_ACTIVITY_STATS', payload: { activityStats: stats}})
        },
        setClubActivities: (activities) => {
            dispatch({type: 'SET_CLUB_ACTIVITIES', payload: { clubActivities: activities}})
        },
        setAthleteActivities: (activities) => {
            dispatch({type: 'SET_ATHLETE_ACTIVITIES', payload: { athleteActivities: activities}})
        }
    }

    return <StravaContext.Provider value={ctx}>{children}</StravaContext.Provider>
}

export default StravaContextProvider;