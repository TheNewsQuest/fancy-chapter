import { Counter, Hello } from './components';

const App = () => {
  return (
    <div className="App">
      <Hello name="TheNewsQuest" />
      <Counter count={1} />
    </div>
  );
};

export default App;
