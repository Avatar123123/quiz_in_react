
import Quiz from './quiz';
import styles from './styles/app.module.css';
function App() {
  return (
    <div>
      <h1 className={styles.banner}>General Knowledge Quiz</h1>
      <Quiz className={styles.app}/>
    </div>
  );
}

export default App;
