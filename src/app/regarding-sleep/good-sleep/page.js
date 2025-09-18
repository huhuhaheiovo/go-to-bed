import Link from "next/link";

export const metadata = {
    title: "good sleep bedding",
    description: "good sleep Tapping Sound,White Noise,Sleep Sounds,ASMR"

};

export default function Home() {

    return (
        <>
            <main className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-6 ">
                {/* 左边：文章内容 */}
                <div className="md:w-2/3 w-full">
                    {/* 横幅图 */}
                    <div className="relative w-full aspect-[16/9]">
                        <img
                            src="/sleep-2025081802.webp"
                            alt="Baby Shower Banner"
                            className="object-cover rounded-lg shadow w-full h-full"
                        />
                    </div>
                    <div className="max-w-3xl mx-auto px-6 py-12  leading-relaxed">
                        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                            Why Good Sleep Matters and How to Get It
                        </h1>

                        <p className="mb-6">
                            We all know that sleep is important, but it’s often the first thing we
                            sacrifice when life gets busy. Whether it’s staying up late to finish
                            work, scrolling on your phone in bed, or binge-watching that one last
                            episode, sleep tends to get pushed aside. The truth is, though, your body
                            and brain rely on sleep just as much as they rely on food and water.
                            Without it, everything from your mood to your immune system takes a hit.
                        </p>

                        <p className="mb-6">
                            So how can you set yourself up for better rest? Let’s break it down into
                            a few simple, practical tips.
                        </p>

                        <h2 className="text-2xl font-semibold mt-10 mb-4">
                            Simple Habits for Better Sleep
                        </h2>
                        <ol className="list-decimal pl-6 space-y-4 mb-6">
                            <li>
                                <strong>Stick to a schedule:</strong> Your body loves routine. Try
                                going to bed and waking up at the same time every day—even on weekends.
                                Over time, this trains your internal clock to know when it’s time to
                                wind down and when it’s time to wake up.
                            </li>
                            <li>
                                <strong>Move your body:</strong> Exercise is great for sleep, but
                                timing matters. Aim for at least 30 minutes of physical activity most
                                days of the week, but avoid working out within a couple of hours before
                                bedtime.
                            </li>
                            <li>
                                <strong>Watch what you drink:</strong> Caffeine and nicotine are
                                stimulants that keep your brain alert. Skip that late-afternoon coffee
                                or evening cigarette. Alcohol may make you drowsy, but it disrupts your
                                sleep cycle.
                            </li>
                            <li>
                                <strong>Create a bedtime routine:</strong> Signal your brain it’s time
                                to relax. Try a warm bath, meditation, or reading. Avoid screens, since
                                blue light tricks your brain into thinking it’s daytime.
                            </li>
                            <li>
                                <strong>Make your bedroom a sleep sanctuary:</strong> Keep your room
                                dark, cool, and quiet. Use blackout curtains or white noise if needed.
                                And avoid TVs, phones, and laptops in bed.
                            </li>
                            <li>
                                <strong>Don’t toss and turn:</strong> If you can’t sleep, get up and do
                                something relaxing like reading or listening to soft music. Go back to
                                bed when you feel sleepy.
                            </li>
                            <li>
                                <strong>Know when to ask for help:</strong> If you’re always tired
                                despite spending enough hours in bed, it might be time to see a doctor.
                                Most sleep disorders are treatable once diagnosed.
                            </li>
                        </ol>

                        <h2 className="text-2xl font-semibold mt-10 mb-4">
                            What Science Says About Sleep
                        </h2>
                        <p className="mb-6">
                            Researchers are still uncovering the mysteries of sleep, but one thing is
                            clear: chronic sleep deprivation is dangerous. People who consistently
                            get too little sleep face higher risks of obesity, heart disease, stroke,
                            infections, and even some cancers. Sleep disturbances are also very
                            common in people with Alzheimer’s, Parkinson’s, and other age-related
                            neurological disorders.
                        </p>

                        <p className="mb-6">
                            One big question scientists are still trying to answer is whether lack of
                            sleep causes these diseases, or if the diseases themselves disrupt sleep.
                            The relationship seems to go both ways. Poor sleep can weaken the immune
                            system, but being sick can also make it harder to sleep. Understanding
                            these connections is at the cutting edge of sleep research.
                        </p>

                        <h2 className="text-2xl font-semibold mt-10 mb-4">Final Thoughts</h2>
                        <p className="mb-6">
                            Getting enough rest isn’t just about feeling less groggy—it’s about
                            protecting your long-term health. Think of sleep as a kind of “nightly
                            maintenance” for your brain and body. When you make it a priority,
                            everything else—your focus, your energy, your mood, and your health—
                            improves.
                        </p>

                        <p>
                            So the next time you’re tempted to stay up scrolling through your phone,
                            remember: tomorrow’s version of you will thank you for putting the screen
                            down and getting some real rest.
                        </p>
                    </div>
                </div>
                {/* 右边：侧栏 */}
                <aside className="md:w-1/3 w-full border-l pl-6">
                    <h2 className="text-3xl font-bold text-[#5799f9] mb-4">More content </h2>
                    <ul className="space-y-4">
                        <li className="border-b-2 py-3 border-b-blue-900">
                            <Link href="/regarding-sleep"
                                  className="text-xl  font-semibold hover:underline    hover:text-blue-300">4-7-8 Method for Rapidly Falling Asleep Through Breathing</Link>
                            <p>September 09, 2025</p>
                        </li>
                        <li className="border-b-2 py-3 border-b-blue-900">
                            <Link href="/regarding-sleep/good-sleep" className="text-xl  font-semibold hover:underline    hover:text-blue-300"> Why Good Sleep Matters and How to Get It</Link>
                            <p>September 16, 2025</p>
                        </li>

                    </ul>
                </aside>
            </main>

        </>
    );
}
