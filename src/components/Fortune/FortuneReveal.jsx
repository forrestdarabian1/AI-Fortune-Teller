import FortuneCard from './FortuneCard'
import InsightCard from './InsightCard'
import LuckyDetails from './LuckyDetails'

export default function FortuneReveal({ data }) {
  if (!data) return null

  return (
    <section className="flex flex-col gap-5" aria-live="polite" aria-label="Your fortune">
      <FortuneCard
        fortune={data.fortune}
        timeframe={data.timeframe}
        category={data.category}
      />
      <InsightCard insight={data.insight} />
      <LuckyDetails
        luckyNumbers={data.luckyNumbers}
        luckyColor={data.luckyColor}
        luckyElement={data.luckyElement}
        luckyDay={data.luckyDay}
      />
    </section>
  )
}
