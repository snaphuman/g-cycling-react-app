import { type ComponentPropsWithoutRef, ReactNode } from "react";
import { useLayoutContext } from "../store/LayoutContext";
import FilterClubActivities from "./FilterClubActivities";


type LayoutProps = {
    children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

const Layout: React.FC<LayoutProps> = ({children}: LayoutProps) => {

    const config = useLayoutContext();

    return (
        <div className={ config.showSidebar ? 'grid-container sidebar-on' : 'grid-container'}>
            <header className='header'>
                <h1>
                Welcome to g-cycling-col!
                </h1>
            </header>

            {
                config.showSidebar && 
                <aside className="sidebar">
                    <FilterClubActivities name="Distance" field="distance" />
                    <FilterClubActivities name="Total Elevation Gain" field="total_elevation_gain" />
                </aside>
            }
            

            <section className="content">
                { children }
            </section>
            <footer className='footer'>
              Footer
            </footer>
        </div>
    )

}

export default Layout;