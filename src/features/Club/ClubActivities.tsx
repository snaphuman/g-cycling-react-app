import axios from "axios";
import { useEffect, useState } from 'react';
import { StravaApi } from "../../enums/StravaApi";
import { useStravaContext } from "../../store/StravaContext";
import { ClubActivity } from "../../models/StravaModels";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ColDef } from 'ag-grid-community';
import { LayoutState, useLayoutContext } from "../../store/LayoutContext";

const ClubActivities: React.FC = () => {

    const { setLayoutState, setActivitiesGridApi, updateGridData } = useLayoutContext();
    const { clubActivities, loggedInAthlete, setAthlete, isGlober } = useStravaContext();
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
        const config: Partial<LayoutState> = {
            isFrontPage: false,
        }

        setLayoutState(isGlober 
                       ? {...config, showSidebar: true}
                       : {...config, showSidebar: false});

        if (loggedInAthlete){
            const isGlober = athleteBelongsToClub(StravaApi.CLUB_ID as unknown as number, loggedInAthlete?.clubs)
            setAthlete(loggedInAthlete, isGlober)
        }

        updateGridData(clubActivities as ClubActivity[])
    }, [isGlober]);

    const onGridReady = (event: any) => {
        setActivitiesGridApi({activitiesGridApi: event.api})
    }

    const athleteBelongsToClub = (clubId: number, clubs?: any[])  => {
        return clubs?.find((club) => club.id == clubId) ? true : false;
    }

    if (!isGlober) {
        return (
            <>
                <h2>
                    You don't have permissions to access this Club
                </h2>
            </>
        )
    }

    return (
        <>
            <h2>
                Club activities
            </h2>
            <div className="ag-theme-quartz"
                 style={{ height: 500 }}
            >
                <AgGridReact
                    rowData={clubActivities}
                    columnDefs={colDefs}
                    onGridReady={onGridReady}
                />
            </div>
        </>
    )
}

export default ClubActivities;