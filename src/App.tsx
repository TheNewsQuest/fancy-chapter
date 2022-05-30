import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components';
import IndexPage from './pages';
import ArticleDetailPage from './pages/ArticleDetailPage';

const App = () => {
  let article_card_mock_data = {
    title:
      'Weekly News Quiz for Students: Roe v. Wade, Drought, Kentucky Derby',
    date: new Date(),
    viewCount: 100,
    questionCount: 9,
    thumbnailUrl:
      'https://static01.nyt.com/images/2022/04/25/climate/00cli-turfban1-LNNQ/merlin_204818043_fa28d456-8e9c-40d5-a4ad-2634453cdbb9-mediumThreeByTwo252.jpg?quality=100&auto=webp',
  };

  let multiple_choice_mock_data = [
    {
      question: 'Who created Python?',
      answers: [
        'Guido van Rossum',
        'David Beckham',
        'David Copperfield',
        'Robin Van Persie',
      ],
      correctAnswerIndex: 2,
      // userChoice: -1
    },
    {
      question: 'Is Python a programming language or an animal?',
      answers: ['A programming language', 'An animal'],
      correctAnswerIndex: 1,
      // userChoice: -1
    },
  ];

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
  );
};

export default App;
