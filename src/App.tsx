import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer, Header, ArticleCard } from './components';
import IndexPage from './pages';
import ArticleDetailPage from './pages/ArticleDetailPage';

import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck} from '@fortawesome/free-regular-svg-icons'
library.add(faEye, faSquareCheck)

const App = () => {
  return (
    <div className="App">
      <ArticleCard title='Weekly News Quiz for Students: Roe v. Wade, Drought, Kentucky Derby' date={new Date()} numberOfView={100} numberOfQuestion={9} thumbnailUrl="/images/thumb.png"></ArticleCard>
    </div>
  );
  // return (
  //   <>
  //     <Router>
  //       <Header />
  //       <Routes>
  //         <Route path="/" element={<IndexPage />} />
  //         <Route path="/articles/:id" element={<ArticleDetailPage />} />
  //       </Routes>
  //       <Footer />
  //     </Router>
  //   </>
  // )
}

export default App;
