import { Calculator } from 'lucide-react'
import SleepCalculatorClient from './SleepCalculatorClient'

export const metadata = {
  title: 'Sleep Calculator - Calculate Your Perfect Sleep Cycle',
  description: 'Use our free Sleep Calculator to find the best time to go to bed or wake up. optimized for 90-minute sleep cycles to help you wake up refreshed.',
  keywords: 'sleep calculator, sleep cycle calculator, wake up time, bedtime calculator, sleep circles, rem sleep calculator',
  openGraph: {
    title: 'Sleep Calculator - Wake Up Refreshed',
    description: 'Calculate your optimal sleep schedule with our scientifically based sleep cycle calculator.',
    type: 'website',
  }
}

export default function SleepCalculatorPage() {
  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Section - Server Rendered for SEO */}
        <div className="text-center space-y-4 mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-indigo-400" />
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Sleep Calculator
            </h1>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Calculate your perfect bedtime and wake-up time based on scientific 90-minute sleep cycles.
          </p>
        </div>

        {/* Client Side Calculator Logic */}
        <SleepCalculatorClient />

        {/* SEO & Educational Content */}
        <div className="space-y-12 pt-12">

          {/* Main Intro Moved to Bottom */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold text-white">Optimize Your Sleep Schedule</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              Our Sleep Calculator helps you determine the optimal bedtime or wake-up time based on your sleep cycles.
              Whether you need to calculate your ideal bedtime or determine when to wake up, this tool provides
              accurate results based on scientific research. It considers your natural sleep cycle length and the time it takes you to fall asleep
              to ensure you wake up feeling refreshed, not groggy.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-8 md:p-10 space-y-8">
            <h2 className="text-2xl font-bold text-white">Understanding Sleep Cycles with Our Sleep Calculator</h2>

            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Sleep describes a recurring state in which the body and mind are at rest, reducing muscle activity,
                interaction with surroundings, and the ability to react to stimuli. The Sleep Calculator uses the
                science of sleep cycles to help you wake up at the optimal time. This comprehensive Sleep Calculator
                is designed to help you understand and optimize your sleep patterns for better health and well-being.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">Sleep Cycles</h3>
              <p>
                The sleep cycle can be defined as the oscillation between non-REM (rapid eye movement) and REM sleep.
                Typically, the body cycles between non-REM and REM sleep over a period of 90 minutes on average,
                and should occur 4-6 times in a good night&apos;s sleep. Our Sleep Calculator is based on this 90-minute cycle.
                By using the Sleep Calculator, you can align your sleep schedule with these natural cycles for better rest quality.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">REM and Non-REM Sleep</h3>
              <p>
                During sleep, the brain expends significantly less energy than it does when a person is awake,
                particularly during non-REM sleep. REM sleep is a type of sleep characterized by eye movements,
                virtual paralysis of the body, and the occurrence of dreams. The Sleep Calculator helps you wake up
                between these cycles for a more refreshed feeling. When you use the Sleep Calculator, it calculates
                the best times to wake up based on when you&apos;ll be in lighter sleep stages, making it easier to start your day.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">How Much Sleep Do I Need?</h3>
              <p>
                Sleep requirements can vary based on age and individual needs. Generally, researchers have found that
                achieving 6-7 hours of sleep per night correlates with positive health outcomes. Use our Sleep Calculator
                to find the right sleep duration for your schedule. The Sleep Calculator recommends 5-6 complete sleep cycles,
                which typically translates to 7.5-9 hours of sleep.
              </p>

              <div className="bg-slate-800/50 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-white mb-3">Recommended Hours of Sleep by Age:</h4>
                <ul className="space-y-2 text-sm grid md:grid-cols-2 gap-x-4">
                  <li><strong className="text-indigo-300">0-3 months:</strong> 14-17 hours</li>
                  <li><strong className="text-indigo-300">4-12 months:</strong> 12-16 hours</li>
                  <li><strong className="text-indigo-300">1-2 years:</strong> 11-14 hours</li>
                  <li><strong className="text-indigo-300">3-5 years:</strong> 10-13 hours</li>
                  <li><strong className="text-indigo-300">6-12 years:</strong> 9-12 hours</li>
                  <li><strong className="text-indigo-300">13-18 years:</strong> 8-10 hours</li>
                  <li><strong className="text-indigo-300">18-60 years:</strong> 7 or more hours</li>
                  <li><strong className="text-indigo-300">61-64 years:</strong> 7-9 hours</li>
                  <li><strong className="text-indigo-300">65+ years:</strong> 7-8 hours</li>
                </ul>
                <p className="text-sm text-slate-300 mt-4">
                  The Sleep Calculator above can help you determine the best sleep schedule based on these recommendations.
                  Simply input your desired wake-up time or bedtime, and the Sleep Calculator will show you the optimal
                  sleep windows for your age group and lifestyle.
                </p>
              </div>
            </div>
          </div>

          {/* Why Use Section */}
          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why Use Our Sleep Calculator?</h2>
            <div className="space-y-3 text-slate-300 leading-relaxed">
              <p>
                Our Sleep Calculator is a powerful tool designed to help you optimize your sleep schedule.
                By using the Sleep Calculator, you can determine the best times to go to bed or wake up based on
                scientific sleep cycle research. The Sleep Calculator takes into account your personal sleep cycle
                length and the time it takes you to fall asleep, providing personalized recommendations.
                The Sleep Calculator is based on decades of sleep research and uses proven algorithms to calculate optimal sleep times.
              </p>
              <p>
                Whether you&apos;re trying to establish a consistent sleep routine or need to adjust your schedule,
                the Sleep Calculator can help. The Sleep Calculator is free to use and provides instant results,
                making it easy to plan your sleep schedule. Start using the Sleep Calculator today to improve your
                sleep quality and wake up feeling more refreshed. The Sleep Calculator works for people of all ages
                and sleep patterns, making it a versatile tool for better sleep health.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
