import React from 'react';
import { CursorInfo } from '../../store/article';
import Spinner from '../Spinner';
import styles from './ReadMoreButton.module.scss';

interface ReadMoreButtonProps {
  label?: string;
  loading?: boolean;
  cursor?: CursorInfo;
  asyncAction: (...args: any[]) => Promise<void>;
}

const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({
  label = 'Read More',
  loading = false,
  cursor,
  asyncAction,
}) => {
  return (
    <>
      <button
        onClick={async () => {
          await asyncAction(cursor);
        }}
        disabled={loading}
        className={styles['read-more-button']}
        style={{
          display: cursor?.isEnd ? 'none' : 'block',
        }}
      >
        {loading ? <Spinner /> : label}
      </button>
    </>
  );
};

export default ReadMoreButton;
