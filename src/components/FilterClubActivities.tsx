import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useStravaContext } from "../store/StravaContext";
import { ClubActivity } from "../models/StravaModels";
import { useLayoutContext } from '../store/LayoutContext';

type FilterClubActivitiesProps = {
    name: string;
}

function valuetext(value: number) {
  return `${value}ºC`;
}

const FilterClubActivities: React.FC<FilterClubActivitiesProps> = ({name}: FilterClubActivitiesProps) => {

    const { updateGridData } = useLayoutContext();
    const [rangeFilter, setRangeFilter] = useState([0,0]);
    const { clubActivities } = useStravaContext();

    const handleRangeFilter = (event: Event, range: number | number[]) => {

        const filter = filterActivitiesByRange(clubActivities as unknown as ClubActivity[], range)
        updateGridData(filter)
        setRangeFilter(range as number[]);
    }

    const filterActivitiesByRange = (activities: ClubActivity[], values: number | number[]): ClubActivity[] => {
        const range = values as unknown as number[];

        if (!activities) return [];

        return activities.filter((activity: any) => 
            activity.distance >= range[0] && activity.distance <= range[1]
        ); 
    }

    useEffect(() => {
        const range = selectedRange();
        setRangeFilter([range[0], range[1]]);
    }, [clubActivities])

    const selectedRange = () => {
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

        return [start, end];
    }
    
    return (
        <>
            <h2>
                {name}
            </h2>
            <Typography id="slider-range-distance" gutterBottom>
                Distance
            </Typography>
            <Slider 
                getAriaLabel={() => 'Temperature range'}
                value={rangeFilter}
                min={selectedRange()[0]}
                max={selectedRange()[1]}
                onChange={handleRangeFilter}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                aria-labelledby="slider-range-distance"
            />
        </>
        )
    }

    export default FilterClubActivities;