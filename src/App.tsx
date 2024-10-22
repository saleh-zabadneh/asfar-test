import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import PaymentsPage from './modules/payment/pages/payments';
import { ThemeProvider } from './providers/theme-provider';

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="system" enableSystem>
        <Layout>
          <Routes>
            <Route path="/" element={<PaymentsPage />} />
          </Routes>
          {/* <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
          <div className="grid gap-4 auto-rows-min md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div> */}
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
