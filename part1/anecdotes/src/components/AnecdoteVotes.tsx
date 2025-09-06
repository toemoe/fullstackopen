interface StatisticsLineProps {
    text: string,
    value: number
}

const StatisticLine = ({text, value}: StatisticsLineProps) => {
    return (
        <tr><td>{text}:</td><td> {value}</td></tr>
    )
}

export default StatisticLine;