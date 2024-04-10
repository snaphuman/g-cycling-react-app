import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, styled } from "@mui/material";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { useStravaContext } from "../../store/StravaContext";

type StatsProps = {
    types: string[];
} & ComponentPropsWithoutRef<'div'>;

type StatFlexListProps = {
    direction: 'row' | 'column'
}

type StatProps = {
    label: string
}

const Stats: React.FC<StatsProps> = ({ types }) => {

    const { activityStats } = useStravaContext();
    const [ selectedActivity, setSelectedActivity ] = useState('ride');
    const [ stats, setStats ] = useState(undefined);

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedActivity((event.target as HTMLInputElement).value)
    }

    useEffect(() => {

        if(activityStats){
            const selected = getSelectedActivityStats();
            setStats(selected[`all_${selectedActivity}_totals`]);
        }

    }, [selectedActivity])

    const getSelectedActivityStats = () => {
        return types?.reduce((stats: Object, item) => {
            const stat = activityStats as unknown as any;
            console.log('stat', stat)

            return Object.assign(stats, {[item]: stat[item]})
        }, {})
    }

    return (
        <>
            <FormControl>
                <FormLabel id='activity-form'>
                    Activity
                </FormLabel>
                <RadioGroup
                    row
                    name="selected-activity"
                    value={selectedActivity}
                    onChange={handleChange}
                    >
                    <FormControlLabel value="ride" control={<Radio />} label="Ride"></FormControlLabel>
                    <FormControlLabel value="run" control={<Radio />} label="Run"></FormControlLabel>
                    <FormControlLabel value="swim" control={<Radio />} label="Swim"></FormControlLabel>


                </RadioGroup>
            </FormControl>

            <StatFlexList direction="row">

            { 
                stats ? Object.entries(stats).map(([item, value],index, arr) => (
                <Stat key={index} label={item}>{stats[item]}</Stat>
                )) : null
            }
            </StatFlexList> 
        </>
    )
};

export default Stats;