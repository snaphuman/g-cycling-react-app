import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { ActivitySportType } from "../../models/StravaModels";
import { ComponentPropsWithoutRef, useState } from "react";

type DropdownFilterProps = {
    name: string;
    field: string;
    options: ActivitySportType[];
} & ComponentPropsWithoutRef<'div'>;


const DropdownFilter: React.FC<DropdownFilterProps> = ({name, field, options, ...props}) => {

    const [sportType, setSportType] = useState<ActivitySportType>(ActivitySportType.AlpineSki);

    const handleChange = (event: SelectChangeEvent) => {
        const selected = event.target.value as unknown as ActivitySportType;
        setSportType(selected);
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
                    onChange={handleChange}
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