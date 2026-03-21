'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  calculateFromBedTime,
  calculateFromNow,
  calculateFromWakeTime,
  durationHours,
  format24
} from '@/lib/sleep';
import { useTranslations } from 'next-intl';

const COPY = {
  en: {
    headerBadge: 'Based on 90-minute sleep cycle science',
    titleStart: 'Sleep',
    titleEm: 'Cycle',
    titleEnd: 'Calculator',
    tagline: 'Find your ideal bedtime and wake-up windows so you wake in lighter sleep stages.',
    nowPrefix: 'Current time',
    tabs: ['Set wake-up time', 'Sleep now', 'Set bedtime'],
    wakeNeedAt: 'I need to wake at',
    wakeHint: 'System will calculate ideal bedtimes',
    onsetLabel: 'Sleep onset (minutes to fall asleep)',
    sleepNowText: 'If you go to sleep now',
    sleepNowHint: 'Includes sleep onset time',
    bedtimePlan: 'I plan to go to bed at',
    bedtimeHint: 'System will calculate ideal wake-up times',
    ageLabel: 'Age group (affects recommended duration)',
    age: [
      { label: 'Child', range: '6-13', min: 8, max: 10 },
      { label: 'Teen', range: '14-17', min: 8, max: 10 },
      { label: 'Adult', range: '18-64', min: 7, max: 9 },
      { label: 'Senior', range: '65+', min: 7, max: 8 }
    ],
    calc: 'Calculate best sleep times',
    resultTitleWake: 'If you need to wake at {time}',
    resultSubWake: 'Recommended bedtimes including {onset} min sleep onset',
    resultTitleNow: 'If you sleep now ({time})',
    resultSubNow: 'Recommended wake-up times across 4-6 full cycles',
    resultTitleBed: 'If you go to bed at {time}',
    resultSubBed: 'Recommended wake-up times including {onset} min sleep onset',
    bedtime: 'Bedtime',
    wakeup: 'Wake up',
    cycles: 'cycles',
    recommended: 'Best',
    chartTitle: 'Typical sleep architecture across one night',
    sectionTableTitle: 'Recommended sleep by age',
    sectionTableSub: 'Source: CDC / AASM guidance',
    tableHeaders: ['Age group', 'Recommended sleep', 'Typical cycles', 'Notes'],
    tableRows: [
      ['0-3 months', '14-17 h', '9-11', 'Includes daytime naps'],
      ['4-11 months', '12-15 h', '8-10', 'Multiple naps'],
      ['1-2 years', '11-14 h', '7-9', 'Includes naps'],
      ['3-5 years', '10-13 h', '6-8', 'Includes naps'],
      ['6-12 years', '9-12 h', '6-8', 'Continuous night sleep'],
      ['13-17 years', '8-10 h', '5-6', 'Later chronotype common'],
      ['18-64 years', '7-9 h', '5-6', 'Core recovery window'],
      ['65+ years', '7-8 h', '5', 'Deep sleep share declines']
    ],
    tipsTitle: 'Science-backed sleep quality tips',
    tipsSub: 'Small habits create large gains in recovery.',
    tips: [
      ['Cool your bedroom', 'Aim for 18-20 C to support faster sleep onset and deeper sleep.'],
      ['No screens 1h before bed', 'Blue light delays melatonin and shifts your biological night.'],
      ['Keep wake time fixed', 'A stable wake time is the fastest way to stabilize circadian rhythm.'],
      ['Stop caffeine after 2 PM', 'Caffeine half-life can still disturb deep sleep late at night.'],
      ['Warm shower before bed', 'Post-shower cooling supports natural sleep pressure.'],
      ['Get morning sunlight', '10 minutes of daylight helps anchor your internal clock.']
    ]
  },
  zh: {
    headerBadge: '基于90分钟睡眠周期科学',
    titleStart: '睡眠',
    titleEm: '周期',
    titleEnd: '计算器',
    tagline: '根据入睡时间或起床时间，计算最佳睡眠窗口，减少睡眠惰性。',
    nowPrefix: '现在时间',
    tabs: ['设定起床时间', '现在去睡觉', '设定入睡时间'],
    wakeNeedAt: '我需要在',
    wakeHint: '系统将计算最佳入睡时间',
    onsetLabel: '入睡时长（通常多久睡着）',
    sleepNowText: '如果你现在去睡觉',
    sleepNowHint: '结果包含入睡时长',
    bedtimePlan: '我计划在',
    bedtimeHint: '系统将计算最佳起床时间',
    ageLabel: '你的年龄段（影响推荐睡眠时长）',
    age: [
      { label: '儿童', range: '6-13岁', min: 8, max: 10 },
      { label: '青少年', range: '14-17岁', min: 8, max: 10 },
      { label: '成人', range: '18-64岁', min: 7, max: 9 },
      { label: '老年人', range: '65岁+', min: 7, max: 8 }
    ],
    calc: '计算最佳睡眠时间',
    resultTitleWake: '如果你需要在 {time} 起床',
    resultSubWake: '以下是推荐入睡时间（含 {onset} 分钟入睡时长）',
    resultTitleNow: '如果你现在（{time}）去睡觉',
    resultSubNow: '以下是推荐起床时间，完整经历 4-6 个周期',
    resultTitleBed: '如果你在 {time} 上床',
    resultSubBed: '以下是推荐起床时间（含 {onset} 分钟入睡时长）',
    bedtime: '入睡时间',
    wakeup: '起床时间',
    cycles: '个周期',
    recommended: '推荐',
    chartTitle: '完整一夜睡眠周期结构（示意）',
    sectionTableTitle: '各年龄推荐睡眠时长',
    sectionTableSub: '来源：CDC / AASM 指南',
    tableHeaders: ['年龄段', '推荐睡眠时长', '推荐周期数', '说明'],
    tableRows: [
      ['新生儿（0-3个月）', '14-17小时', '9-11个', '包含白天小睡'],
      ['婴儿（4-11个月）', '12-15小时', '8-10个', '含多次小睡'],
      ['幼儿（1-2岁）', '11-14小时', '7-9个', '含午睡'],
      ['学龄前（3-5岁）', '10-13小时', '6-8个', '含午睡'],
      ['学龄期（6-12岁）', '9-12小时', '6-8个', '夜间连续睡眠'],
      ['青少年（13-17岁）', '8-10小时', '5-6个', '生理钟偏晚型'],
      ['成人（18-64岁）', '7-9小时', '5-6个', '黄金睡眠窗口'],
      ['老年人（65岁+）', '7-8小时', '5个', '深睡比例减少']
    ],
    tipsTitle: '提升睡眠质量的科学建议',
    tipsSub: '小改变，大不同。',
    tips: [
      ['降低卧室温度', '建议保持 18-20 C，有助于更快入睡。'],
      ['睡前1小时断屏', '蓝光会抑制褪黑素分泌并推迟困意。'],
      ['固定起床时间', '规律起床能更快重置昼夜节律。'],
      ['下午2点后少咖啡因', '残留咖啡因会削弱深度睡眠。'],
      ['睡前温水浴', '洗澡后的降温过程有助于诱导睡意。'],
      ['晨间日照', '早晨光照有助于稳定生物钟。']
    ]
  },
  ja: {
    headerBadge: '90分睡眠サイクル科学に基づく',
    titleStart: '睡眠',
    titleEm: 'サイクル',
    titleEnd: '計算機',
    tagline: '就寝時刻または起床時刻から、最適な睡眠ウィンドウを計算します。',
    nowPrefix: '現在時刻',
    tabs: ['起床時間を設定', '今すぐ眠る', '就寝時間を設定'],
    wakeNeedAt: '起床予定',
    wakeHint: '最適な就寝時刻を計算します',
    onsetLabel: '入眠時間（眠りにつくまで）',
    sleepNowText: '今から眠る場合',
    sleepNowHint: '入眠時間を含んで計算',
    bedtimePlan: '就寝予定',
    bedtimeHint: '最適な起床時刻を計算します',
    ageLabel: '年齢層（推奨睡眠時間に影響）',
    age: [
      { label: '子ども', range: '6-13歳', min: 8, max: 10 },
      { label: '10代', range: '14-17歳', min: 8, max: 10 },
      { label: '成人', range: '18-64歳', min: 7, max: 9 },
      { label: '高齢者', range: '65歳+', min: 7, max: 8 }
    ],
    calc: '最適な睡眠時間を計算',
    resultTitleWake: '{time} に起きる場合',
    resultSubWake: '入眠時間 {onset} 分を含む推奨就寝時刻',
    resultTitleNow: '今（{time}）眠る場合',
    resultSubNow: '4-6 サイクルを完了する推奨起床時刻',
    resultTitleBed: '{time} に寝る場合',
    resultSubBed: '入眠時間 {onset} 分を含む推奨起床時刻',
    bedtime: '就寝',
    wakeup: '起床',
    cycles: 'サイクル',
    recommended: 'おすすめ',
    chartTitle: '一晩の睡眠アーキテクチャ（概略）',
    sectionTableTitle: '年齢別の推奨睡眠時間',
    sectionTableSub: '出典：CDC / AASM ガイドライン',
    tableHeaders: ['年齢層', '推奨睡眠時間', '推奨サイクル', 'メモ'],
    tableRows: [
      ['0-3か月', '14-17時間', '9-11', '昼寝を含む'],
      ['4-11か月', '12-15時間', '8-10', '複数回の昼寝'],
      ['1-2歳', '11-14時間', '7-9', '昼寝を含む'],
      ['3-5歳', '10-13時間', '6-8', '昼寝を含む'],
      ['6-12歳', '9-12時間', '6-8', '夜間の連続睡眠'],
      ['13-17歳', '8-10時間', '5-6', '遅寝傾向あり'],
      ['18-64歳', '7-9時間', '5-6', '回復の中心帯'],
      ['65歳以上', '7-8時間', '5', '深睡眠比率が低下']
    ],
    tipsTitle: '睡眠の質を高める科学的ヒント',
    tipsSub: '小さな習慣が大きな違いを生みます。',
    tips: [
      ['寝室を涼しく', '18-20 C を目安にすると入眠しやすくなります。'],
      ['就寝1時間前は画面オフ', 'ブルーライトはメラトニン分泌を遅らせます。'],
      ['起床時刻を固定', '体内時計の安定に最も効果的です。'],
      ['午後2時以降のカフェインを控える', '夜の深睡眠を妨げる可能性があります。'],
      ['就寝前の温浴', '入浴後の体温低下が眠気を促します。'],
      ['朝の日光を浴びる', '概日リズムを整える基本です。']
    ]
  }
};

function parseTimeToToday(value) {
  const [hours, minutes] = value.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export default function SleepCalculator({ locale = 'en', homeH1 }) {
  const dictionary = COPY[locale] || COPY.en;
  const tCalc = useTranslations('calculator');
  const [mode, setMode] = useState('wake');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [bedTime, setBedTime] = useState('23:00');
  const [onsetWake, setOnsetWake] = useState(15);
  const [onsetNow, setOnsetNow] = useState(15);
  const [onsetBed, setOnsetBed] = useState(15);
  const [currentTime, setCurrentTime] = useState(() => format24(new Date()));
  const [ageIndex, setAgeIndex] = useState(2);
  const [results, setResults] = useState([]);
  const [resultTitle, setResultTitle] = useState('');
  const [resultSubtitle, setResultSubtitle] = useState('');

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(format24(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const ageRule = dictionary.age[ageIndex];

  const computed = useMemo(() => {
    return results.map((item, idx) => {
      const hours = durationHours(item.totalSleepMinutes);
      const within = hours >= ageRule.min && hours <= ageRule.max;
      return {
        ...item,
        hours,
        recommended: within && idx === results.findIndex((x) => {
          const xh = durationHours(x.totalSleepMinutes);
          return xh >= ageRule.min && xh <= ageRule.max;
        })
      };
    });
  }, [results, ageRule.max, ageRule.min]);

  function runCalculation() {
    if (mode === 'wake') {
      const wakeDate = parseTimeToToday(wakeTime);
      const output = calculateFromWakeTime(wakeDate, onsetWake);
      setResultTitle(dictionary.resultTitleWake.replace('{time}', format24(wakeDate)));
      setResultSubtitle(dictionary.resultSubWake.replace('{onset}', String(onsetWake)));
      setResults(output);
      return;
    }

    if (mode === 'sleep') {
      const now = new Date();
      const output = calculateFromNow(now, onsetNow);
      setResultTitle(dictionary.resultTitleNow.replace('{time}', format24(now)));
      setResultSubtitle(dictionary.resultSubNow);
      setResults(output);
      return;
    }

    const bedDate = parseTimeToToday(bedTime);
    const output = calculateFromBedTime(bedDate, onsetBed);
    setResultTitle(dictionary.resultTitleBed.replace('{time}', format24(bedDate)));
    setResultSubtitle(dictionary.resultSubBed.replace('{onset}', String(onsetBed)));
    setResults(output);
  }

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob" />
        <div className="aurora-blob" />
        <div className="aurora-blob" />
      </div>

      <header className="sc-hero">
        <span className="badge"><span className="badge-dot" />{dictionary.headerBadge}</span>
        <h1>{homeH1 || `${dictionary.titleStart} ${dictionary.titleEm} ${dictionary.titleEnd}`}</h1>
        <p className="tagline">{dictionary.tagline}</p>
        <div className="now-badge">{dictionary.nowPrefix}: <strong>{currentTime}</strong></div>
      </header>

      <section className="container">
        <div className="mode-tabs">
          {dictionary.tabs.map((tab, idx) => {
            const id = idx === 0 ? 'wake' : idx === 1 ? 'sleep' : 'bedtime';
            return (
              <button key={id} className={`mode-tab ${mode === id ? 'active' : ''}`} onClick={() => setMode(id)}>
                {tab}
              </button>
            );
          })}
        </div>

        <div className="calc-card">
          {mode === 'wake' && (
            <div className="mode-panel active">
              <div className="input-row">
                <div className="input-group">
                  <label>{dictionary.wakeNeedAt}</label>
                  <div className="time-input-wrap">
                    <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />
                  </div>
                </div>
                <div className="input-group">
                  <label>{tCalc('label_wake_time')}</label>
                  <div className="hint-box">{dictionary.wakeHint}</div>
                </div>
              </div>
              <div className="input-group sleep-onset-group">
                <label>{dictionary.onsetLabel}</label>
                <div className="slider-row">
                  <input type="range" min="5" max="45" value={onsetWake} onChange={(e) => setOnsetWake(Number(e.target.value))} />
                  <span className="slider-val">{onsetWake}m</span>
                </div>
              </div>
            </div>
          )}

          {mode === 'sleep' && (
            <div className="mode-panel active">
              <div className="sleep-now-box">
                <p>{dictionary.sleepNowText}</p>
                <p className="sleep-now-time">{currentTime}</p>
                <p>{dictionary.sleepNowHint}</p>
              </div>
              <div className="input-group sleep-onset-group">
                <label>{dictionary.onsetLabel}</label>
                <div className="slider-row">
                  <input type="range" min="5" max="45" value={onsetNow} onChange={(e) => setOnsetNow(Number(e.target.value))} />
                  <span className="slider-val">{onsetNow}m</span>
                </div>
              </div>
            </div>
          )}

          {mode === 'bedtime' && (
            <div className="mode-panel active">
              <div className="input-row">
                <div className="input-group">
                  <label>{dictionary.bedtimePlan}</label>
                  <div className="time-input-wrap">
                    <input type="time" value={bedTime} onChange={(e) => setBedTime(e.target.value)} />
                  </div>
                </div>
                <div className="input-group">
                  <label>{dictionary.bedtime}</label>
                  <div className="hint-box">{dictionary.bedtimeHint}</div>
                </div>
              </div>
              <div className="input-group sleep-onset-group">
                <label>{dictionary.onsetLabel}</label>
                <div className="slider-row">
                  <input type="range" min="5" max="45" value={onsetBed} onChange={(e) => setOnsetBed(Number(e.target.value))} />
                  <span className="slider-val">{onsetBed}m</span>
                </div>
              </div>
            </div>
          )}

          <span className="age-label">{dictionary.ageLabel}</span>
          <div className="age-grid">
            {dictionary.age.map((group, idx) => (
              <button key={group.label} className={`age-btn ${idx === ageIndex ? 'active' : ''}`} onClick={() => setAgeIndex(idx)}>
                <span className="age-range">{group.range}</span>
                {group.label}
              </button>
            ))}
          </div>

          <button className="calc-btn" onClick={runCalculation}>{dictionary.calc}</button>
        </div>

        {computed.length > 0 && (
          <div id="results">
            <div className="results-header">
              <h2>{resultTitle}</h2>
              <p>{resultSubtitle}</p>
            </div>
            <div className="time-grid">
              {computed.map((row) => {
                const durationClass = row.hours <= 6.5 ? 'dur-6h' : row.hours <= 8 ? 'dur-7h5' : 'dur-9h';
                return (
                  <div key={`${row.cycles}-${row.totalSleepMinutes}`} className={`time-card ${row.recommended ? 'best' : ''}`}>
                    {row.recommended && <span className="recommended-pill">{dictionary.recommended}</span>}
                    <div className="cycles-label">{row.mode === 'bedtime' ? dictionary.bedtime : dictionary.wakeup}</div>
                    <div className="time-val">{format24(row.time)}</div>
                    <div className="cycles-info">{row.cycles} {dictionary.cycles}</div>
                    <span className={`duration-badge ${durationClass}`}>{row.hours}h</span>
                  </div>
                );
              })}
            </div>

            <div className="cycle-viz-wrap reveal">
              <div className="cycle-viz-title">{dictionary.chartTitle}</div>
              <div className="cycle-line" />
            </div>
          </div>
        )}

        <div className="reveal">
          <h2 className="section-title">{dictionary.sectionTableTitle}</h2>
          <p className="section-sub">{dictionary.sectionTableSub}</p>
          <div className="sleep-table-wrap">
            <table>
              <thead>
                <tr>
                  {dictionary.tableHeaders.map((head) => <th key={head}>{head}</th>)}
                </tr>
              </thead>
              <tbody>
                {dictionary.tableRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => <td key={cell}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="tips-section reveal">
          <h2 className="section-title">{dictionary.tipsTitle}</h2>
          <p className="section-sub">{dictionary.tipsSub}</p>
          <div className="tips-grid">
            {dictionary.tips.map((tip) => (
              <article className="tip-card" key={tip[0]}>
                <h3 className="tip-title">{tip[0]}</h3>
                <p className="tip-text">{tip[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
