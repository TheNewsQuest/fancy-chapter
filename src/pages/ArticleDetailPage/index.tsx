import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../components';

type ArticleDetailParams = {
  id: string;
};

const ArticleDetailPage: React.FC = () => {
  let { id } = useParams<ArticleDetailParams>();
  return (
    <>
      <Container>
        <h1>Article #{id}</h1>
      </Container>
    </>
  );
};

export default ArticleDetailPage;
