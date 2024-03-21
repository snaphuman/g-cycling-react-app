import React from 'react';
import { SliderRangeFilter } from '../Filter/Index';

type FilterClubActivitiesProps = {
    title: string;
}

const FilterClubActivities: React.FC<FilterClubActivitiesProps> = ({title}: FilterClubActivitiesProps) => {

    
    return (
        <>
            <h2>{title}</h2>
            <SliderRangeFilter name="Distance" field="distance" />
            <SliderRangeFilter name="Total Elevation Gain" field="total_elevation_gain" />

        </>
        )
    }

    export default FilterClubActivities;