import React from 'react';
import SliderRangeFilter from './SliderRangeFilter';

type FilterClubActivitiesProps = {
    name: string;
    field: string;
}

function valuetext(value: number) {
  return `${value}ºC`;
}

const FilterClubActivities: React.FC<FilterClubActivitiesProps> = ({name, field}: FilterClubActivitiesProps) => {

    
    return (
        <>
            <SliderRangeFilter name="Distance" field="distance" />

        </>
        )
    }

    export default FilterClubActivities;