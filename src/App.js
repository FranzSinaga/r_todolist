import "./App.css";
import WebRoutes from "./routes";

import { ThemeProvider } from './components/toggleTheme/ThemeContext';
import Background from './components/toggleTheme/Background';

function App() {
  return (
    <ThemeProvider>
      <Background>
        <div className="App">
          <WebRoutes />
        </div>
      </Background>
    </ThemeProvider>
  );
}

export default App;
