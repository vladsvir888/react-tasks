import '../globals.css';
import App from '../../App';
import { hasLocale } from 'next-intl';
import { routing } from '../../i18n/routing';
import { notFound } from 'next/navigation';

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <div id="root">
          <App>{children}</App>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
