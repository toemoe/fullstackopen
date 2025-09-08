import Content from "./Content"
import Header from "./Header"
import Total from "./Total"

interface PartType {
    name: string;
    exercises: number;
}

interface CourseProps {
    course: {
        name: string,
        parts: PartType[]
    }
}

const Course = ({ course }: CourseProps) => {
    return (
        <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total total={course.parts.reduce((sum, part) => part.exercises + sum, 0)} />
      </div>
    )
}

export default Course;