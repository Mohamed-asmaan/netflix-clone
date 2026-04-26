const plans = [
  {
    title: 'Mobile',
    quality: '480p',
    price: '149',
    points: ['Fair video quality', 'For your phone or tablet'],
    style: 'from-sky-700/70 to-indigo-900/80',
  },
  {
    title: 'Basic',
    quality: '720p',
    price: '199',
    points: ['Good video quality', 'For your phone, tablet, laptop and TV'],
    style: 'from-blue-700/60 to-indigo-950/80',
  },
  {
    title: 'Standard',
    quality: '1080p',
    price: '499',
    points: ['Great video quality', 'For your phone, tablet, laptop and TV'],
    style: 'from-violet-700/60 to-indigo-950/80',
  },
  {
    title: 'Premium',
    quality: '4K + HDR',
    price: '649',
    points: ['Best video quality', 'For your phone, tablet, laptop and TV'],
    style: 'from-purple-700/60 to-indigo-950/80',
  },
]

function PlanSection() {
  return (
    <section className="mt-4">
      <h2 className="mb-3 break-words text-white sm:mb-4">
        A plan to suit your needs
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <article
            key={plan.title}
            className={`rounded-xl border border-white/15 bg-gradient-to-br p-4 sm:rounded-2xl ${plan.style}`}
          >
            <h3 className="text-white">{plan.title}</h3>
            <div className="mt-1.5 text-base font-semibold leading-tight text-zinc-200 sm:mt-2 sm:text-lg">
              {plan.quality}
            </div>
            <ul className="mt-3 space-y-1.5 text-xs font-normal leading-snug text-zinc-200 sm:mt-4 sm:space-y-2 sm:text-[12px]">
              {plan.points.map((point) => (
                <li key={point}>✓ {point}</li>
              ))}
            </ul>
            <div className="mt-3 text-lg font-semibold leading-tight text-zinc-100 sm:mt-4 sm:text-xl">
              ₹{plan.price}/mo
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PlanSection
