import React from 'react';
import styles from './styles.module.css';
import LiveCoder from './components/LiveCoder';
import Spacer from '../../../../components/other/Spacer';

const reactCode = `// 1️⃣ Create State with the initial value "Hello World"
const MY_FIRST_STATE = createState("Hello World");

let helloWorldCount = 0;
const RandomComponent = () => {
    // 2️⃣ Bind initialized State to the 'RandomComponent' for reactivity
    const myFirstState = useAgile(MY_FIRST_STATE);

    return (
        <div>
            <p>{myFirstState}</p>
            <button
                onClick={() => {
                    // 3️⃣ Update State value on Button press
                    MY_FIRST_STATE.set('Hello World ' + ++helloWorldCount);
                }}
            >
                Update State
            </button>
        </div>
    );
}

render(<RandomComponent/>);
`;

const StartCodingView: React.FC = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <div className={styles.InnerContent}>
          <div className={styles.HeaderContainer}>
            <div className={styles.TaglineContainer}>
              <h3 className={styles.Tagline}>Stop Talking</h3>
            </div>
            <h1 className={styles.Title}>Start Coding</h1>
          </div>
          <Spacer height={30} />
          <LiveCoder reactCode={reactCode} />
        </div>
      </div>
    </div>
  );
};

export default StartCodingView;
