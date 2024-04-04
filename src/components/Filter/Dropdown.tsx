import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { ActivitySportType, ClubActivity } from "../../models/StravaModels";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { useStravaContext } from "../../store/StravaContext";
import { useLayoutContext } from "../../store/LayoutContext";

type DropdownFilterProps = {
    name: string;
    field: string;
} & ComponentPropsWithoutRef<'div'>;


const DropdownFilter: React.FC<DropdownFilterProps> = ({name, field, ...props}) => {

    const { updateGridData } = useLayoutContext();
    const { clubActivities } = useStravaContext();

    const [options, setOptions] = useState<(ActivitySportType | undefined)[]>([])
    const [sportType, setSportType] = useState<ActivitySportType | string>('');

    useEffect(() => {
        const options = getUniqueSportTypesOptions();
        setOptions(options);
    }, [clubActivities]);

    const getUniqueSportTypesOptions = () => {
        if (!clubActivities) { return [] };

        const sportTypes = clubActivities?.map<ActivitySportType | undefined>((activity) => (activity?.sport_type))

        return sportTypes?.reduce<(ActivitySportType | undefined)[]>((list, option) => {

            return !list?.includes(option) ? [...list, option] : list;
        }, [] as (ActivitySportType | undefined)[]);
    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        const selected = event.target.value as unknown as ActivitySportType;
        const filter = filterActivitiesBySportType(clubActivities as unknown as ClubActivity[], selected);
        updateGridData(filter);
        setSportType(selected);
    }

    const filterActivitiesBySportType = (activities: ClubActivity[], selected: ActivitySportType) => {
        return activities.filter(activity => activity.sport_type === selected);
    }

    return options ? (
        <>
            <h3>{ name }</h3>
            <FormControl className={props.className}>
                <InputLabel>{ name }</InputLabel>
                <Select
                    className={props.className}
                    value={sportType}
                    label={name}
                    onChange={handleSelectChange}
                >
                    { 
                        options.map((option) => ( 
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                </Select>
            </FormControl>
        </>
    ) : null;
}

export default DropdownFilter;