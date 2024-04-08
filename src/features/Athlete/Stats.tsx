import { ComponentPropsWithoutRef } from "react";

type StatsProps = {
    types: string[];
    source: 'recentRideTotals' | 'recentActivitiesTotals' | 'recentActivitiesAverage'
} & ComponentPropsWithoutRef<'div'>;

const Stats: React.FC<StatsProps> = ({ types, source }) => {

    return (
       <>
        Stats
        { types }
        { source }
       </> 
    )
}

export default Stats;