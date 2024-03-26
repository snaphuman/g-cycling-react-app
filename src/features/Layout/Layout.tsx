import { type ComponentPropsWithoutRef, ReactNode } from "react";
import { useLayoutContext } from "../../store/LayoutContext";
import FilterClubActivities from "../ClubActivities/ClubActivitiesFilter";
import StravaAuthButton from '../../components/Strava/StravaAuthButton';


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
                <StravaAuthButton />
            </header>

            {
                config.showSidebar && 
                <aside className="sidebar">
                    <FilterClubActivities title="Activities Filter" />
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