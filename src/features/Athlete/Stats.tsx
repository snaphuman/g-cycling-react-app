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
    const [ selectedPeriod, setSelectedPeriod ] = useState('all');
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
        setSelectedPeriod((event.target as HTMLInputElement).value)
    }

    useEffect(() => {

        if(activityStats){
            const selected = getSelectedActivityStats();
            console.log('selected', selected);
            setStats(selected[`${selectedPeriod}_ride_totals`]);
        }

    }, [selectedPeriod])

    const getSelectedActivityStats = () => {
        return types?.reduce((stats: Object, item) => {
            const stat = activityStats as unknown as any;

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
                    value={selectedPeriod}
                    onChange={handleChange}
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