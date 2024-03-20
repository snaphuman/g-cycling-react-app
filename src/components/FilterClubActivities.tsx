import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import { useStravaContext } from "../store/StravaContext";
import { ClubActivity } from "../models/StravaModels";
import { useLayoutContext } from '../store/LayoutContext';

type FilterClubActivitiesProps = {
    name: string;
    field: string;
}

function valuetext(value: number) {
  return `${value}ºC`;
}

const FilterClubActivities: React.FC<FilterClubActivitiesProps> = ({name, field}: FilterClubActivitiesProps) => {

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
            activity[field] >= range[0] && activity[field] <= range[1]
        ); 
    }

    useEffect(() => {
        const range = selectedRange();
        setRangeFilter([range[0], range[1]]);
    }, [clubActivities])

    const selectedRange = () => {
            const start = clubActivities?.reduce((min: any, {distance, total_elevation_gain}, index) => { 
                if (index === 0 ) {
                    min = field === 'distance' ? distance : total_elevation_gain;
                }
         
              return field === 'distance' ? ((distance! < min) ? distance : min) : ((total_elevation_gain! < min) ? total_elevation_gain : min);
            }, 0) ?? 0; 

            const end = clubActivities?.reduce((max: any, {distance, total_elevation_gain}, index) => {
                if (index === 0) {
                    max = field === 'distance' ? distance : total_elevation_gain;
                }

                return field === 'distance' ? ((distance! > max) ? distance : max) : ((total_elevation_gain! > max) ? total_elevation_gain : max);
            }, 0) || 0;

            return [start, end];
    }
    
    return (
        <>
            <h2 id={`slider-range-${field}`}>
                { field }
            </h2>
            <Slider 
                getAriaLabel={() => 'Distance'}
                value={rangeFilter}
                min={selectedRange()[0]}
                max={selectedRange()[1]}
                onChange={handleRangeFilter}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                aria-labelledby={`slider-range-${field}`}
            />
        </>
        )
    }

    export default FilterClubActivities;