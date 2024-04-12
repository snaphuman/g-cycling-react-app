import { FormControl, FormControlLabel, FormLabel, Icon, Radio, RadioGroup, ToggleButton, ToggleButtonGroup, styled } from "@mui/material";
import React, { ComponentPropsWithoutRef, MouseEvent, useEffect, useState } from "react";
import { useStravaContext } from "../../store/StravaContext";
import { DirectionsBike, DirectionsRun, Pool } from "@mui/icons-material";
import { ActivityTotal } from "../../models/StravaModels";

type StatsProps = {
} & ComponentPropsWithoutRef<'div'>;

type StatFlexListProps = {
    direction: 'row' | 'column'
}

type StatProps = {
    label: string
}

type Activity = 'ride' | 'run' | 'swim';

type Period = 'all' | 'recent' | 'ytd';

const Stats: React.FC<StatsProps> = () => {

    const { activityStats } = useStravaContext();
    const [ selectedPeriod, setSelectedPeriod ] = useState<Period>('all');
    const [ selectedActivity, setSelectedActivity ] = useState<Activity>('ride');
    const [ stats, setStats ] = useState<ActivityTotal | undefined>(undefined);

    const StatFlexList = styled('div')<StatFlexListProps>(({ direction }) => ({
        display: 'flex',
        flexDirection: direction,
    }));

    const Stat = styled('div')<StatProps>(({label}) => ({
        backgroundColor: 'orange',
        width: '200px',
        height: '200px',
        borderRadius: '100px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ':after': {
            content: `"${label}"`,
            position: 'absolute',
            bottom: '-30px'
        }
    }));

    const handleActivityChange = (_event: React.MouseEvent<HTMLElement>, activity: string) => {
        setSelectedActivity(activity as Activity)
    }

    const handlePeriodChange = (_event: React.ChangeEvent<HTMLInputElement>, period: string) => {
        setSelectedPeriod(period as Period);
    }

    useEffect(() => {

        if(activityStats){
            const selectedStats: ActivityTotal | undefined = activityStats[`${selectedPeriod}_${selectedActivity}_totals`];
            setStats(selectedStats);
        }

    }, [selectedPeriod, selectedActivity])

    return (
        <>
            <FormControl color="primary" component='fieldset'> 
                <FormLabel component='legend'>Activity</FormLabel>
                <ToggleButtonGroup
                    value={selectedActivity}
                    exclusive
                    onChange={handleActivityChange}
                >
                    <ToggleButton value='ride'>
                        <Icon>
                            <DirectionsBike></DirectionsBike>
                        </Icon>
                    </ToggleButton>
                    <ToggleButton value='swim'>
                        <Icon>
                            <Pool></Pool>
                        </Icon>
                    </ToggleButton>
                    <ToggleButton value='run'>
                        <Icon>
                            <DirectionsRun></DirectionsRun>
                        </Icon>
                    </ToggleButton>
                </ToggleButtonGroup>
            </FormControl>

            <FormControl>
                <FormControlLabel label='Period' control={<RadioGroup/>} />
                <RadioGroup
                    row
                    name="selected-activity"
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                    >
                    <FormControlLabel value="all" control={<Radio />} label="All"></FormControlLabel>
                    <FormControlLabel value="recent" control={<Radio />} label="Recent"></FormControlLabel>
                    <FormControlLabel value="ytd" control={<Radio />} label="Year to date"></FormControlLabel>


                </RadioGroup>
            </FormControl>

            <StatFlexList direction="row">

            { 
                stats && Object.entries(stats).map(([item, _value],index, arr) => 
                        <Stat key={index} label={item}>{arr[index].at(1) as number}</Stat>) 
            }

            </StatFlexList> 
        </>
    )
};

export default Stats;