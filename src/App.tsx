import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import IndexPage from './pages';
import ArticleDetailPage from './pages/ArticleDetailPage';

const App = () => {
  return (
    <>
      <Router>
        <div>#Header</div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/articles/1">Article #1</Link>
        </div>
        <div>
          <Link to="/articles/2">Article #2</Link>
        </div>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
        </Routes>
        <div>#Footer</div>
      </Router>
    </>
  );
};

export default App;
