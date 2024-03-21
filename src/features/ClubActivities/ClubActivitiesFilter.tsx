import React from 'react';
import { DropdownFilter, SliderRangeFilter } from '../Filter/Index';
import { ActivitySportType } from '../../models/StravaModels';

type FilterClubActivitiesProps = {
    title: string;
}

const FilterClubActivities: React.FC<FilterClubActivitiesProps> = ({title}: FilterClubActivitiesProps) => {

    const sportTypes = Object.values(ActivitySportType);
    
    return (
        <>
            <h2>{title}</h2>
            <SliderRangeFilter name="Distance" field="distance" />
            <SliderRangeFilter name="Total Elevation Gain" field="total_elevation_gain" />
            <DropdownFilter name="Sport Type" field="sport_type" options={sportTypes} />
        </>
        )
    }

    export default FilterClubActivities;