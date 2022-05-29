import { Container } from '../components';
import { Article } from '../types/article';
import styles from './IndexPage.module.scss';

const IndexPage = () => {
  const mockArticles: Article[] = [];
  return (
    <Container className={styles['container']}>
      <div className={styles['header']}>Weekly News Quiz</div>
    </Container>
  );
};

export default IndexPage;
