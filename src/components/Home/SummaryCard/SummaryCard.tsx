import './style.css'

type SummaryCardProps = {
    title: string
    value: number
}

export function SummaryCard({ title, value }: SummaryCardProps) {
    return (
        <section className="summaryCard">
            <span>{value}</span>

            <h2>{title}</h2>
        </section>
    )
}

