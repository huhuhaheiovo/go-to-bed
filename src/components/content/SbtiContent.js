'use client';

import { useState } from 'react';

const CONTENT = {
  zh: {
    hero_sub: '全新社交人格测试系统 — 通过15个维度精准匹配27种SBTI人格类型',
    cta_start: '立即开始SBTI测试',
    intro_title: '什么是SBTI测试？',
    intro_p1:
      'SBTI测试是一套全新的社交人格测试系统，专注于分析你在社交场景中的真实人格表现。不同于传统的MBTI测试侧重认知功能分类，SBTI人格测试从更贴近日常生活的角度，帮助你了解自己在人际关系中的行为模式和内在驱动力。',
    intro_p2:
      'SBTI人格测试通过五大核心模型来构建你的人格画像：自我认知模型衡量你的自尊与自信水平，情感模型评估你的依恋风格与安全感，态度模型分析你的决策偏好与价值取向，行动驱力模型揭示你的行为动机来源，社交模型则测量你在群体互动中的主动性与开放度。',
    models_title: 'SBTI测试的五大核心模型',
    models: [
      {
        name: '自我认知模型',
        desc: 'SBTI测试首先从自我认知出发，评估你的自尊水平和自信程度。高自尊者在社交中更坦然，而低自尊者可能更敏感。这一维度是SBTI人格类型划分的基础。',
      },
      {
        name: '情感模型',
        desc: '基于依恋理论，SBTI测试分析你的情感安全感和亲密关系模式。你是安全型、焦虑型还是回避型？这决定了你在社交中的情感反应和关系建立方式。',
      },
      {
        name: '态度模型',
        desc: 'SBTI人格测试中的态度维度关注你的决策风格，你是理性分析型还是直觉感受型？面对冲突时你倾向于对抗还是妥协？这些态度特征影响你的社交策略。',
      },
      {
        name: '行动驱力模型',
        desc: '什么驱动你采取行动？SBTI测试区分了内在驱力与外在驱力。有人被成就感驱动，有人被归属感驱动，行动驱力的差异造就了不同的SBTI人格表现。',
      },
      {
        name: '社交模型',
        desc: 'SBTI测试的核心维度，测量你在社交场景中的主动性和边界感。你是主动社交者还是被动回应者？你的社交舒适区在哪里？这些特征直接定义你的SBTI类型。',
      },
    ],
    types_title: 'SBTI测试的27种人格类型',
    types_p:
      'SBTI测试通过五大模型的交叉组合，精准匹配27种独特的社交人格类型。每种SBTI类型都有鲜明的社交特征和行为模式。通过SBTI人格测试，你将获得详细的类型描述、优势分析和成长建议。不同的SBTI类型在团队协作、亲密关系和职场社交中表现各异，了解自己的类型能帮助你在社交场景中做出更自在的选择。',
    diff_title: 'SBTI测试与MBTI测试的区别',
    diff_p:
      'MBTI测试基于荣格的认知功能理论，将人分为16种类型，侧重于信息处理和决策方式。而SBTI人格测试专注于社交场景中的人格表现，涵盖自尊、依恋、态度、驱力和社交五大领域，生成27种类型。SBTI测试的维度更多、分类更细，能揭示MBTI无法覆盖的社交人格特质，比如你的依恋安全感、行动驱力来源以及社交主动性。两者并不冲突，你可以把SBTI测试作为MBTI的补充工具，从社交角度获得更完整的自我认知。',
    test_title: '开始你的SBTI人格测试',
    test_p:
      '准备好了吗？下方是SBTI在线测试界面，完全免费，无需注册。建议在安静环境中凭第一直觉作答，不要过度思考。完成所有题目后，你将立即获得你的SBTI人格类型结果和详细分析报告。',
    faq_title: '关于SBTI测试的常见问题',
    cta_bottom: '立即开始免费SBTI人格测试',
    cta_bottom_sub: '只需5-10分钟，发现你独特的SBTI社交人格类型',
  },
  en: {
    hero_sub: 'A new social personality system — 15 dimensions, 27 unique SBTI personality types',
    cta_start: 'Start SBTI Test Now',
    intro_title: 'What Is the SBTI Test?',
    intro_p1:
      'The SBTI test is a new social personality assessment system designed to analyze how you truly behave in social situations. Unlike traditional MBTI tests that focus on cognitive function classification, the SBTI personality test takes a real-world approach to help you understand your behavioral patterns and inner drives in interpersonal relationships.',
    intro_p2:
      'The SBTI personality test builds your profile through five core models: the self-perception model measures your self-esteem and confidence levels, the emotion model evaluates your attachment style and sense of security, the attitude model analyzes your decision-making preferences, the action drive model reveals the sources of your behavioral motivation, and the social model measures your initiative and openness in group interactions.',
    models_title: 'Five Core Models of the SBTI Test',
    models: [
      {
        name: 'Self-Perception Model',
        desc: 'The SBTI test starts with self-perception, evaluating your self-esteem and confidence. Those with higher self-esteem navigate social settings more comfortably, while lower self-esteem may lead to heightened sensitivity. This dimension forms the foundation of your SBTI type.',
      },
      {
        name: 'Emotion Model',
        desc: 'Based on attachment theory, the SBTI test analyzes your emotional security and relationship patterns. Are you secure, anxious, or avoidant? This determines your emotional responses and how you build connections with others.',
      },
      {
        name: 'Attitude Model',
        desc: 'The attitude dimension in the SBTI personality test examines your decision-making style — are you analytical or intuitive? Do you lean toward confrontation or compromise? These traits shape your social strategies.',
      },
      {
        name: 'Action Drive Model',
        desc: 'What drives you to take action? The SBTI test distinguishes between internal and external motivation. Some are driven by achievement, others by belonging — these differences create distinct SBTI personality expressions.',
      },
      {
        name: 'Social Model',
        desc: 'The core dimension of the SBTI test, measuring your social initiative and boundary awareness. Are you a proactive socializer or a reactive responder? These traits directly define your SBTI type.',
      },
    ],
    types_title: '27 SBTI Personality Types',
    types_p:
      'Through the cross-combination of five models, the SBTI test precisely matches you to one of 27 unique social personality types. Each SBTI type has distinctive social traits and behavioral patterns. Your SBTI personality test results include detailed type descriptions, strength analysis, and growth suggestions. Different SBTI types perform differently in teamwork, intimate relationships, and professional networking.',
    diff_title: 'SBTI Test vs MBTI: Key Differences',
    diff_p:
      'The MBTI test is based on Jungian cognitive function theory, classifying people into 16 types focused on information processing and decision-making. The SBTI personality test, on the other hand, focuses on personality expression in social contexts, covering self-esteem, attachment, attitude, drive, and social dimensions to generate 27 types. The SBTI test offers more dimensions and finer classification, revealing social personality traits that MBTI cannot cover — such as your attachment security, action drive sources, and social initiative. The two tests complement each other, and you can use the SBTI test alongside MBTI for a more complete understanding of yourself.',
    test_title: 'Start Your SBTI Personality Test',
    test_p:
      'Ready to discover your type? The SBTI online test below is completely free with no registration required. Answer instinctively in a quiet environment for the most accurate results. After completing all questions, you will instantly receive your SBTI personality type result and detailed analysis.',
    faq_title: 'Frequently Asked Questions About the SBTI Test',
    cta_bottom: 'Start Your Free SBTI Personality Test',
    cta_bottom_sub: 'Just 5-10 minutes to discover your unique SBTI social personality type',
  },
  ja: {
    hero_sub: '新しいソーシャル性格診断 — 15の次元で27種類のSBTIタイプを特定',
    cta_start: 'SBTIテストを始める',
    intro_title: 'SBTIテストとは？',
    intro_p1:
      'SBTIテストは、社交場面でのあなたの本当の性格を分析する新しいソーシャル性格診断システムです。認知機能の分類に重点を置く従来のMBTIテストとは異なり、SBTIテストは対人関係における行動パターンと内的動機を日常生活の視点から理解する手助けをします。',
    intro_p2:
      'SBTIテストは5つのコアモデルであなたの性格を構築します。自己認知モデルは自尊心と自信を測定し、感情モデルは愛着スタイルと安心感を評価し、態度モデルは意思決定スタイルを分析し、行動力モデルは行動の動機を明らかにし、社交モデルはグループ内での積極性と開放性を測定します。',
    models_title: 'SBTIテストの5つのコアモデル',
    models: [
      {
        name: '自己認知モデル',
        desc: 'SBTIテストはまず自己認知から始まり、自尊心と自信を評価します。自尊心が高い人は社交場面でより快適に振る舞い、低い人はより敏感になりがちです。',
      },
      {
        name: '感情モデル',
        desc: '愛着理論に基づき、SBTIテストはあなたの感情的安全性と関係パターンを分析します。安全型、不安型、回避型のどれに当てはまりますか？',
      },
      {
        name: '態度モデル',
        desc: 'SBTIテストの態度次元は、あなたの意思決定スタイルを検証します。分析型か直感型か、対立か妥協かといった傾向が社交戦略に影響します。',
      },
      {
        name: '行動力モデル',
        desc: '何があなたを動かすのか？SBTIテストは内的動機と外的動機を区別します。達成感に駆動される人と帰属感に駆動される人では、社交での表現が異なります。',
      },
      {
        name: '社交モデル',
        desc: 'SBTIテストの核心的次元で、社交場面での積極性と境界意識を測定します。主体的に社交する人か受動的に応答する人かを判定します。',
      },
    ],
    types_title: 'SBTIテストの27種類の性格タイプ',
    types_p:
      'SBTIテストは5つのモデルの交差組み合わせにより、27種類のユニークなソーシャル性格タイプを特定します。各SBTIタイプには独自の社交特性と行動パターンがあります。チームワーク、親密な関係、職場のネットワーキングにおいて、自分のタイプを知ることがより自然な社交につながります。',
    diff_title: 'SBTIテストとMBTIの違い',
    diff_p:
      'MBTIテストはユングの認知機能理論に基づき16タイプに分類しますが、SBTIテストは社交場面での性格表現に焦点を当て、自尊心、愛着、態度、行動力、社交の5領域で27タイプを生成します。SBTIテストはMBTIが網羅できない社交性格の特質を明らかにする補完的なツールです。',
    test_title: 'SBTIテストを始めましょう',
    test_p:
      '準備はできましたか？下記のSBTIオンラインテストは完全無料、登録不要です。静かな環境で直感的に回答してください。全問回答後、すぐにSBTI性格タイプの結果と詳細分析が表示されます。',
    faq_title: 'SBTIテストに関するよくある質問',
    cta_bottom: '無料SBTIテストを今すぐ始める',
    cta_bottom_sub: '5〜10分であなたのSBTIソーシャル性格タイプを発見',
  },
};

export default function SbtiContent({ locale, seo }) {
  const t = CONTENT[locale] || CONTENT.en;

  return (
    <>
      {/* Hero */}
      <section className="sc-hero" style={{ paddingBottom: 24 }}>
        <h1>
          {seo.h1.split('SBTI')[0]}
          <em>SBTI</em>
          {seo.h1.split('SBTI').slice(1).join('SBTI')}
        </h1>
        <p className="tagline">{t.hero_sub}</p>
      </section>

      {/* Test iframe - right below hero */}
      <section className="content-section" id="sbti-test">
        <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: '#fff',
          }}
        >
          <iframe
            src="https://sbti.fancc.de5.net/"
            title={seo.h1}
            style={{
              width: '100%',
              height: '80vh',
              border: 'none',
              display: 'block',
            }}
            allowFullScreen
          />
        </div>
      </section>

      {/* Intro */}
      <section className="content-section">
        <h2 className="section-title">{t.intro_title}</h2>
        <p className="section-sub" style={{ lineHeight: 1.75, marginBottom: 14 }}>
          {t.intro_p1}
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>{t.intro_p2}</p>
      </section>

      {/* Five Models */}
      <section className="content-section">
        <h2 className="section-title">{t.models_title}</h2>
        <div className="tips-grid" style={{ marginTop: 18 }}>
          {t.models.map((model, i) => (
            <div className="tip-card" key={i}>
              <h3 className="tip-title" style={{ fontFamily: "'DM Serif Display', serif" }}>
                {model.name}
              </h3>
              <p className="tip-text" style={{ lineHeight: 1.7, fontSize: 14 }}>{model.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 27 Types */}
      <section className="content-section">
        <h2 className="section-title">{t.types_title}</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>{t.types_p}</p>
      </section>

      {/* SBTI vs MBTI */}
      <section className="content-section">
        <h2 className="section-title">{t.diff_title}</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>{t.diff_p}</p>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2 className="section-title">{t.faq_title}</h2>
        <FaqList locale={locale} />
      </section>

      {/* Bottom CTA */}
      <section style={{ textAlign: 'center', padding: '32px 0 64px' }}>
        <h2 className="section-title" style={{ fontSize: 24 }}>
          {t.cta_bottom}
        </h2>
        <p className="section-sub">{t.cta_bottom_sub}</p>
        <a
          href="#sbti-test"
          className="calc-btn"
          style={{
            display: 'inline-block',
            maxWidth: 360,
            textDecoration: 'none',
            marginTop: 16,
          }}
        >
          {t.cta_start}
        </a>
      </section>
    </>
  );
}

function FaqList({ locale }) {
  const faqMap = {
    zh: [
      {
        q: 'SBTI测试和MBTI测试有什么区别？',
        a: 'SBTI测试是全新的社交人格测试系统，与MBTI不同。MBTI侧重认知功能分类，而SBTI测试从自我认知、情感模式、态度倾向、行动驱力和社交风格五个维度出发，通过15个子维度精准匹配27种人格类型，更加关注人在社交场景中的真实表现。',
      },
      {
        q: 'SBTI测试需要多长时间完成？',
        a: 'SBTI人格测试通常需要5到10分钟完成。建议在安静环境中凭第一感觉作答，不要过度思考，这样测试结果才能更准确地反映你的真实人格特质。',
      },
      {
        q: 'SBTI测试的27种人格类型是怎么划分的？',
        a: '通过自我模型、情感模型、态度模型、行动驱力模型和社交模型这五大核心模型，交叉组合生成27种SBTI人格类型。每种类型代表了一种独特的社交人格画像。',
      },
      {
        q: 'SBTI测试结果准确吗？',
        a: 'SBTI测试基于自尊理论、依恋理论和社交动机理论设计，具有较好的理论基础。建议结合个人经历来理解你的SBTI类型，任何人格测试都是自我认知的参考工具。',
      },
      {
        q: 'SBTI测试可以免费做吗？',
        a: '是的，本页面提供完全免费的SBTI在线测试。无需注册，无需付费，直接开始即可获取你的测试结果和人格类型分析报告。',
      },
    ],
    en: [
      {
        q: 'What is the difference between the SBTI test and MBTI?',
        a: 'The SBTI test is a new social personality system. Unlike MBTI which focuses on cognitive functions, the SBTI test analyzes your personality through five core models — self-perception, emotion, attitude, action drive, and social style — across 15 dimensions to match you with one of 27 types.',
      },
      {
        q: 'How long does the SBTI test take?',
        a: 'The SBTI personality test typically takes 5 to 10 minutes. Answer instinctively in a quiet environment for the most accurate results reflecting your true personality traits.',
      },
      {
        q: 'How are the 27 SBTI personality types determined?',
        a: 'The SBTI test uses five core models that combine to generate 27 distinct personality types. Each type represents a unique social personality profile covering self-esteem, attachment style, decision-making, and social initiative.',
      },
      {
        q: 'Is the SBTI test free?',
        a: 'Yes, the SBTI test on this page is completely free. No registration or payment required — start the personality test right away and get your full type analysis.',
      },
    ],
    ja: [
      {
        q: 'SBTIテストとMBTIの違いは？',
        a: 'SBTIテストは新しいソーシャル性格診断システムです。認知機能に注目するMBTIと異なり、自己認知・感情・態度・行動力・社交の5モデル、15次元で27タイプに分類します。',
      },
      {
        q: 'SBTIテストの所要時間は？',
        a: 'SBTIテストは通常5〜10分で完了します。静かな環境で直感的に回答することで、より正確な診断結果を得られます。',
      },
      {
        q: 'SBTIテストは無料ですか？',
        a: 'はい、このページのSBTIテストは完全無料です。登録不要、即時にテストを開始して結果を確認できます。',
      },
    ],
  };

  const items = faqMap[locale] || faqMap.en;

  return (
    <div style={{ marginTop: 18 }}>
      {items.map((item, i) => (
        <FaqItem key={i} q={item.q} a={item.a} />
      ))}
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          color: 'var(--text)',
          fontFamily: "'DM Serif Display', serif",
          fontSize: 18,
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span>{q}</span>
        <span
          style={{
            flexShrink: 0,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            fontSize: 22,
            color: 'var(--accent2)',
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p
          style={{
            color: 'var(--text-muted)',
            lineHeight: 1.75,
            marginTop: 10,
            fontSize: 14,
            paddingRight: 32,
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}
