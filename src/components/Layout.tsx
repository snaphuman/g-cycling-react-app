import { type ComponentPropsWithoutRef, ReactNode, useState, useEffect } from "react";
import { useLayoutContext } from "../store/LayoutContext";
import { useStravaContext } from "../store/StravaContext";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { ClubActivity } from "../models/StravaModels";


type LayoutProps = {
    children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

function valuetext(value: number) {
  return `${value}ºC`;
}

const Layout: React.FC<LayoutProps> = ({children}: LayoutProps) => {

    const config = useLayoutContext();
    const {clubActivities} = useStravaContext();

    const [rangeFilter, setRangeFilter] = useState([0,0])

    const handleRangeFilter = (event: Event, range: number | number[]) => {
        const result = filterActivitiesByRange(clubActivities!, range);
        console.log('result', result);
        setRangeFilter(range as number[]);
    }

    const filterActivitiesByRange = (activities: ClubActivity[], range: number | number[]) => {


        return activities;

    }

    useEffect(() => {
        const range = initialRange();
        setRangeFilter([range.start, range.end]);
    }, [])

    const initialRange = () => {
        const start = clubActivities?.reduce((min: any, {distance}, index) => { 
            if (index === 0 ) {
                min = distance;
            }
         
           return (distance! < min) ? distance : min;
        }, 0) ?? 0; 

        const end = clubActivities?.reduce((max: any, {distance}, index) => {
            if (index === 0) {
                max = distance;
            }

            return (distance! > max) ? distance : max
        }, 0) || 0;

        return {start, end};
    }

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
                    <Typography id="slider-range-distance" gutterBottom>
                        Distance
                    </Typography>
                    <Slider 
                        getAriaLabel={() => 'Temperature range'}
                        value={rangeFilter}
                        min={initialRange().start}
                        max={initialRange().end}
                        onChange={handleRangeFilter}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        aria-labelledby="slider-range-distance"
                    />
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