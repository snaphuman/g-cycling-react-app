import { styled } from "@mui/material";
import { ComponentPropsWithoutRef } from "react";

type StatsProps = {
    types: string[];
    source: 'recentRideTotals' | 'recentActivitiesTotals' | 'recentActivitiesAverage'
} & ComponentPropsWithoutRef<'div'>;

type StatFlexListProps = {
    direction: 'row' | 'column'
}

type StatProps = {
    label: string
}

const Stats: React.FC<StatsProps> = ({ types, source }) => {

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

    return (
       <StatFlexList direction="row">
        { types.map((item, index) => (
            <Stat key={index} label={item}>{10}</Stat>
            ))
        }
       </StatFlexList> 
    )
}

export default Stats;