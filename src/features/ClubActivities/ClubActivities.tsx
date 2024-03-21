import axios from "axios";
import { useEffect, useState } from 'react';
import { StravaApi } from "../../enums/StravaApi";
import { useStravaContext } from "../../store/StravaContext";
import { ClubActivity } from "../../models/StravaModels";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ColDef } from 'ag-grid-community';
import { useLayoutContext } from "../../store/LayoutContext";

const ClubActivities: React.FC = () => {

    const { setLayoutState, updateGridData, setActivitiesGridApi } = useLayoutContext();
    const { token, setClubActivities: setActivities, clubActivities: activities } = useStravaContext();
    const [colDefs, setColDefs] = useState<ColDef[]>([
        { field: 'athlete.firstname' },
        { field: 'athlete.lastname' },
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
            showSidebar: true,
        });

        if (!activities) {
            fetchActivities();
        };

    }, []);

    const fetchActivities = async () => {
        try {
            const response = await axios.get<ClubActivity[]>(`${StravaApi.API_URL}/clubs/${StravaApi.CLUB_ID}/activities`, {
                headers: {
                    Authorization: `Bearer ${ token }`,
                }
            })

            setActivities(response.data);
            updateGridData(response.data);

        } catch (error) {

        }
    }

    const onGridReady = (event: any) => {
        setActivitiesGridApi({activitiesGridApi: event.api})
    }

    return (
        <>
            <h2>
                Leader Board
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

export default ClubActivities;