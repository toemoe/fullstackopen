interface TotalProps {
    total: number;
}

const Total = ({total}: TotalProps) => {
    return (
        <>
        <b><p>Number of exercises: {total}</p></b>
        </>
    )
}

export default Total;