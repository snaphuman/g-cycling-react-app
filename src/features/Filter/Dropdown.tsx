import { ActivitySportType } from "../../models/StravaModels";

type DropdownFilterProps = {
    name: string;
    field: string;
    options: ActivitySportType[];
}


const DropdownFilter: React.FC<DropdownFilterProps> = ({name, field, options}) => {

    return (
        <>
            <h2>{ name }</h2>
            This is a Dropdown
        </>
    )
}

export default DropdownFilter;