import { NextIntlClientProvider } from 'next-intl';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';

export default function SiteShell({ locale = 'en', messages, children }) {
  return (
    <>
      <Nav locale={locale} />
      <main className="sc-main">
        {messages ? (
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        ) : (
          children
        )}
      </main>
      <Footer locale={locale} />
    </>
  );
}
