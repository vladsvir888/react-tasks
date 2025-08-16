import './globals.css';
import App from '../App';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <App>{children}</App>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
