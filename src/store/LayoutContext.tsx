import  { type ReactNode, createContext, useContext, useReducer, useState} from 'react';

export type LayoutState = {
    showSidebar: boolean;
    isFrontPage: boolean;
}

type LayoutContextValue = LayoutState & {
    setLayoutState: (config: LayoutState) => void
}

type LayoutContextProviderProps = {
    children: ReactNode;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);
const initialState: LayoutState = {
    showSidebar: false,
    isFrontPage: true,
}

export function useLayoutContext() {
    const layoutCtx = useContext(LayoutContext)

    if(layoutCtx === null) {
        throw new Error('Unexpected error');
    }

    return layoutCtx;
}

const layoutStateReducer = (state: LayoutState, data: LayoutState) => {

    return {...state, ...data}
}

const LayoutContextProvider = ({children}: LayoutContextProviderProps) => {

    const [layoutState, dispatch] = useReducer(layoutStateReducer, initialState);

    const ctx: LayoutContextValue = {
        isFrontPage: layoutState.isFrontPage,
        showSidebar: layoutState.showSidebar,
        setLayoutState: (config) => {
            dispatch(config)
        },
    }

    return <LayoutContext.Provider value={ctx}>{children}</LayoutContext.Provider>
}

export default LayoutContextProvider;