import { type ReactNode, createContext, useContext, useReducer} from 'react';
import { ClubActivity } from '../models/StravaModels';

export type LayoutState = {
    showSidebar: boolean;
    isFrontPage: boolean;
    activitiesGridApi?: any;
}

type LayoutContextValue = LayoutState & {
    setLayoutState: (config: Partial<LayoutState>) => void;
    setActivitiesGridApi: (config: Partial<LayoutState>) => void;
    updateGridData: (data: ClubActivity[]) => void;
}

type LayoutContextProviderProps = {
    children: ReactNode;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);
const initialState: LayoutState = {
    showSidebar: false,
    isFrontPage: true,
    activitiesGridApi: undefined
}

export function useLayoutContext() {
    const layoutCtx = useContext(LayoutContext)

    if(layoutCtx === null) {
        throw new Error('Unexpected error');
    }

    return layoutCtx;
}

const layoutStateReducer = (state: LayoutState, data: Partial<LayoutState>) => {
    return {...state, ...data}
}

const LayoutContextProvider = ({children}: LayoutContextProviderProps) => {

    const [layoutState, dispatch] = useReducer(layoutStateReducer, initialState);
    const ctx: LayoutContextValue = {
        isFrontPage: layoutState.isFrontPage,
        showSidebar: layoutState.showSidebar,
        activitiesGridApi: layoutState.activitiesGridApi,
        setLayoutState: (config) => {
            dispatch(config)
        },
        updateGridData: (data) => {
            const gridApi = layoutState.activitiesGridApi;
            console.log('gridApi', gridApi)
            if (gridApi && !gridApi?.destroyCalled) {
                gridApi.updateGridOptions({'rowData': data});
            }
        },
        setActivitiesGridApi: (config) => {
            dispatch(config)
        },
    }

    return <LayoutContext.Provider value={ctx}>{children}</LayoutContext.Provider>
}

export default LayoutContextProvider;