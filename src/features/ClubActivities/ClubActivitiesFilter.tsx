import React from 'react';
import { DropdownFilter, SliderRangeFilter } from '../Filter/Index';
import { ActivitySportType } from '../../models/StravaModels';
import './ClubActivities.css';

type FilterClubActivitiesProps = {
    title: string;
}

const FilterClubActivities: React.FC<FilterClubActivitiesProps> = ({title}: FilterClubActivitiesProps) => {

    const sportTypes = Object.keys(ActivitySportType) as unknown as ActivitySportType[];
    console.log(sportTypes)
    
    return (
        <>
            <h2>{title}</h2>
            <SliderRangeFilter name="Distance" field="distance" />
            <SliderRangeFilter name="Total Elevation Gain" field="total_elevation_gain" />
            <DropdownFilter className="dropdown full-width" name="Sport Type" field="sport_type" options={sportTypes} />
        </>
        )
    }

    export default FilterClubActivities;