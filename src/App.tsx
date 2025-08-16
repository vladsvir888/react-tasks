import ReduxProvider from './providers/redux';
import ThemeProvider from './providers/theme';
import Navigation from './components/Navigation';
import ThemeSwitcher from './components/ThemeSwitcher';
import FlyOutPanel from './components/FlyOutPanel';
import { NextIntlClientProvider } from 'next-intl';
import LangSwitcher from './components/LangSwitcher';

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider>
      <ReduxProvider>
        <ThemeProvider>
          <div className="p-2.5 pb-24">
            <header className="flex flex-wrap items-center justify-between mb-2.5 gap-2.5">
              <Navigation />
              <div className="flex gap-2.5">
                <ThemeSwitcher />
                <LangSwitcher />
              </div>
            </header>
            <main>{children}</main>
            <FlyOutPanel />
          </div>
        </ThemeProvider>
      </ReduxProvider>
    </NextIntlClientProvider>
  );
};

export default App;
