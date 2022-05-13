import styles from './Hello.module.scss';
const Hello = ({ name }) => (
  <>
    <h1 className={styles['header-blue']}>Hello {name}</h1>
  </>
);

export default Hello;
