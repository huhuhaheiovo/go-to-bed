import { buildMetadata } from '@/lib/metadata';
import { getPageSeo } from '@/lib/page-seo';
import SbtiContent from '@/components/content/SbtiContent';

const PAGE_KEY = 'sbtitest';

export async function generateStaticParams() {
  const locales = ['en', 'zh', 'ja'];
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata(locale, PAGE_KEY, 'sbtitest');
}

export default async function SbtiTestPage({ params }) {
  const { locale } = await params;
  const seo = getPageSeo(locale, PAGE_KEY);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seo.title,
    description: seo.description,
    url: `https://sleeptool.top/${locale === 'en' ? '' : locale + '/'}sbtitest`,
    inLanguage: locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : 'en-US',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getFaq(locale).map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SbtiContent locale={locale} seo={seo} />
    </div>
  );
}

function getFaq(locale) {
  const faqMap = {
    zh: [
      {
        q: 'SBTI测试和MBTI测试有什么区别？',
        a: 'SBTI测试是全新的社交人格测试系统，与MBTI不同。MBTI侧重认知功能分类，而SBTI测试从自我认知、情感模式、态度倾向、行动驱力和社交风格五个维度出发，通过15个子维度精准匹配27种人格类型，更加关注人在社交场景中的真实表现。',
      },
      {
        q: 'SBTI测试需要多长时间完成？',
        a: 'SBTI人格测试通常需要5到10分钟完成。测试包含多组情境化问题，建议在安静环境中凭第一感觉作答，不要过度思考，这样SBTI测试结果才能更准确地反映你的真实人格特质。',
      },
      {
        q: 'SBTI测试的27种人格类型是怎么划分的？',
        a: 'SBTI测试通过自我模型、情感模型、态度模型、行动驱力模型和社交模型这五大核心模型，交叉组合生成27种SBTI人格类型。每种类型代表了一种独特的社交人格画像，涵盖自尊水平、依恋风格、决策偏好和社交主动性等关键特征。',
      },
      {
        q: 'SBTI测试结果准确吗？',
        a: 'SBTI测试基于心理学中的自尊理论、依恋理论和社交动机理论设计，具有较好的理论基础。但任何人格测试都是参考工具，SBTI测试结果能帮助你更好地理解自己的社交人格倾向，不宜作为绝对标签。建议结合个人经历来理解你的SBTI类型。',
      },
      {
        q: 'SBTI测试可以免费做吗？',
        a: '是的，本页面提供完全免费的SBTI在线测试。无需注册，无需付费，直接开始SBTI人格测试即可获取你的测试结果和人格类型分析报告。',
      },
    ],
    en: [
      {
        q: 'What is the difference between SBTI test and MBTI?',
        a: 'The SBTI test is a new social personality system. Unlike MBTI which focuses on cognitive functions, the SBTI test analyzes your personality through five core models — self-perception, emotion, attitude, action drive, and social style — across 15 dimensions to match you with one of 27 personality types.',
      },
      {
        q: 'How long does the SBTI test take?',
        a: 'The SBTI personality test typically takes 5 to 10 minutes. It consists of scenario-based questions. Answer with your first instinct in a quiet environment for the most accurate SBTI results.',
      },
      {
        q: 'How are the 27 SBTI personality types determined?',
        a: 'The SBTI test uses five core models — self, emotion, attitude, action drive, and social — that combine to generate 27 distinct personality types. Each type represents a unique social personality profile covering self-esteem, attachment style, decision-making, and social initiative.',
      },
      {
        q: 'Is the SBTI test free?',
        a: 'Yes, the SBTI test on this page is completely free. No registration or payment required — start the SBTI personality test right away and get your full type analysis.',
      },
    ],
    ja: [
      {
        q: 'SBTIテストとMBTIの違いは？',
        a: 'SBTIテストは新しいソーシャル性格診断システムです。認知機能に注目するMBTIと異なり、SBTIテストは自己認知・感情・態度・行動力・社交の5モデル、15次元で27タイプに分類します。',
      },
      {
        q: 'SBTIテストの所要時間は？',
        a: 'SBTIテストは通常5〜10分で完了します。静かな環境で直感的に回答することで、より正確なSBTI診断結果を得られます。',
      },
      {
        q: 'SBTIテストは無料ですか？',
        a: 'はい、このページのSBTIテストは完全無料です。登録不要、即時にSBTI性格テストを開始して結果を確認できます。',
      },
    ],
  };
  return faqMap[locale] || faqMap.en;
}
