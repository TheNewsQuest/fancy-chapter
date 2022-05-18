import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer, Header, ArticleCard } from './components';
import IndexPage from './pages';
import ArticleDetailPage from './pages/ArticleDetailPage';

const App = () => {
  // return (
  //   <div className="App">
  //     <ArticleCard title='Weekly News Quiz for Students: Roe v. Wade, Drought, Kentucky Derby' date={new Date()} numberOfView={100} numberOfQuestion={9} thumbnailUrl="/public/images/thumb.png"></ArticleCard>
  //   </div>
  // );
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
