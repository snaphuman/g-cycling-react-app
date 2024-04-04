import React from 'react';
import { DropdownFilter, SliderRangeFilter } from '../../components/Filter/Index';
import './ClubActivities.css';

type FilterClubActivitiesProps = {
    title: string;
}

const FilterClubActivities: React.FC<FilterClubActivitiesProps> = ({title}: FilterClubActivitiesProps) => {

    return (
        <>
            <h2>{title}</h2>
            <SliderRangeFilter name="Distance" field="distance" />
            <SliderRangeFilter name="Total Elevation Gain" field="total_elevation_gain" />
            <DropdownFilter className="dropdown full-width" name="Sport Type" field="sport_type" />
        </>
        )
    }

    export default FilterClubActivities;