import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { ActivitySportType } from "../../models/StravaModels";
import { useState } from "react";

type DropdownFilterProps = {
    name: string;
    field: string;
    options: ActivitySportType[];
}


const DropdownFilter: React.FC<DropdownFilterProps> = ({name, field, options}) => {

    const [sportType, setSportType] = useState<ActivitySportType>(ActivitySportType.AlpineSki);

    const handleChange = (event: SelectChangeEvent) => {
        const selected = event.target.value as unknown as ActivitySportType;
        setSportType(selected);
    }

    return (
        <>
            <h2>{ name }</h2>
            <FormControl>
                <InputLabel>{ name }</InputLabel>
                <Select
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