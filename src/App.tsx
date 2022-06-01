import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components';
import SwitchTab from './components/SwitchTab';
import IndexPage from './pages';
import ArticleDetailPage from './pages/ArticleDetailPage';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/tab" element={<SwitchTab />} />
          <Route path="/" element={<IndexPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
