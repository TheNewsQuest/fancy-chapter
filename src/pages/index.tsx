import { Container } from '../components';
import styles from './IndexPage.module.scss';

const IndexPage = () => {
  return (
    <Container className={styles['container']}>
      <h1>This is inside container of Index Page.</h1>
    </Container>
  );
};

export default IndexPage;
