import ReduxProvider from './providers/redux';
import ThemeProvider from './providers/theme';
import Navigation from './components/Navigation';
import ThemeSwitcher from './components/ThemeSwitcher';
import FlyOutPanel from './components/FlyOutPanel';

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <div className="p-2.5 pb-24">
          <header className="flex flex-wrap items-center justify-between mb-2.5 gap-2.5">
            <Navigation />
            <ThemeSwitcher />
          </header>
          <main>{children}</main>
          <FlyOutPanel />
        </div>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
