import { BackTop } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components';
import ScrollToTop from './components/ScrollToTop';
import IndexPage from './pages';
import ArticleDetailPage from './pages/ArticleDetailPage';
import InsightPage from './pages/InsightPage';

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/insight" element={<InsightPage />} />
        </Routes>
        <BackTop />
        <Footer />
      </Router>
    </>
  );
};

export default App;
