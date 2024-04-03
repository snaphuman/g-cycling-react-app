import { useState, useEffect, type ComponentPropsWithoutRef } from "react";
import { useStravaContext } from "../../store/StravaContext";
import { useLayoutContext } from "../../store/LayoutContext";
import axios from "axios";
import { StravaApi } from "../../enums/StravaApi";
import { AthleteActivity } from "../../models/StravaModels";
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

type ActivitiesProps = {

} & ComponentPropsWithoutRef<'section'>;

const Activities: React.FC<ActivitiesProps> = ({...props}) => {

    const { setLayoutState } = useLayoutContext();
    const { token, setAthleteActivities, athleteActivities: activities } = useStravaContext();

    const [colDefs, setColDefs] = useState<ColDef[]>([
        { field: 'name' },
        { field: 'distance' },
        { field: 'moving_time' },
        { field: 'elapsed_time' },
        { field: 'total_elevation_gain' },
        { field: 'sport_type' },
        { field: 'workout_type' },
    ]);

    useEffect(() => {
        setLayoutState({
            isFrontPage: false,
            showSidebar: false,
        });

        if (!activities) {
            getLoggedIntAthlete();
        }
    }, []);

    const getLoggedIntAthlete = async () => {
        const response = await axios.get<AthleteActivity[]>(`${StravaApi.API_URL}/athlete/activities`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.data)
        setAthleteActivities(response.data);
    }

    const onGridReady = (event: any) => {
        console.log('grid api', event)
    }

    return (
        <>
            <h2>
                My Activities 
            </h2>
            <div className="ag-theme-quartz"
                 style={{ height: 500 }}
            >
                <AgGridReact
                    rowData={activities}
                    columnDefs={colDefs}
                    onGridReady={onGridReady}
                />
            </div>
        </>
    )
}

export default Activities;