import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { ActivitySportType, ClubActivity } from "../../models/StravaModels";
import { ComponentPropsWithoutRef, useState } from "react";
import { useStravaContext } from "../../store/StravaContext";
import { useLayoutContext } from "../../store/LayoutContext";

type DropdownFilterProps = {
    name: string;
    field: string;
    options: ActivitySportType[];
} & ComponentPropsWithoutRef<'div'>;


const DropdownFilter: React.FC<DropdownFilterProps> = ({name, field, options, ...props}) => {

    const { updateGridData } = useLayoutContext();
    const { clubActivities } = useStravaContext();
    const [sportType, setSportType] = useState<ActivitySportType>(ActivitySportType.AlpineSki);

    const handleSelectChange = (event: SelectChangeEvent) => {
        const selected = event.target.value as unknown as ActivitySportType;
        const filter = filterActivitiesBySportType(clubActivities as unknown as ClubActivity[], selected);
        updateGridData(filter);
        setSportType(selected);
    }

    const filterActivitiesBySportType = (activities: ClubActivity[], selected: ActivitySportType) => {
        return activities.filter(activity => activity.sport_type === selected);
    }

    return (
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
                        options.map((option: ActivitySportType) => ( 
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                </Select>
            </FormControl>
        </>
    )
}

export default DropdownFilter;