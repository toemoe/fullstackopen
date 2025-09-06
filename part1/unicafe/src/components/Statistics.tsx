import StatisticLine from "./StatisticLine"

interface StatisticsProps {
    feedback: {
        good: number,
        neutral: number,
        bad: number,
        all: number,
    }
}

const Statistics = ({feedback}: StatisticsProps) => {
    const goodMark = 1;
    const neutralMark = 0;
    const badMark = -1;

    const averageMark = () => {
        if (feedback.all === 0) {
            return 0;
        } else {
            return (feedback.good * goodMark + feedback.neutral * neutralMark + feedback.bad * badMark) / feedback.all;
        }
    }

    return (
        <div>
        <h2>Statistic</h2>
        {feedback.all === 0 ? (<p>No feedback given</p>) : (
            <>
            <table>
            <tbody>
            <StatisticLine text="good" value={feedback.good}/>
            <StatisticLine text="neutral" value={feedback.neutral}/>
            <StatisticLine text="bad" value={feedback.bad}/>
            <StatisticLine text="all" value={feedback.all}/>
            <StatisticLine text="average" value={averageMark()} />
            <StatisticLine text="positive" value={feedback.good * 100 / feedback.all} />
            </tbody>
            </table>
            </>
        )}
        </div>
    )
}

export default Statistics;