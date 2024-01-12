import React, { useState} from 'react';
import { questionData} from './data/questionData';
import { calculateGrade } from './calculateGrade';
import DisplayScore from './calculatePercentage';
import styles from './styles/quiz.module.css';


export default function Quiz() {
    const [index, setIndex] = useState(0);
    const [hint, setHint] = useState(false);
    const [chosenAnswers, setChosenAnswers] = useState(Array(questionData.length).fill(null));
    const [submitted, setSubmitted] = useState(false);
    const [calculatedScore, setcalculatedScore] = useState(0)

    let hasPrev = index > 0;
    let hasNext = index < questionData.length - 1;
    
    function handleNext()
    {
        if (hasNext)
        {
            setIndex(index + 1);
            setHint(false);
        }
    }

    function handlePrevious()
    {
        if (hasPrev)
        {
            setIndex(index - 1);
            setHint(false);
        }
    }

    function handleHint()
    {
        setHint(!hint);
    }

    const handleSelectedOption = (e) => {
        const newChosenAnswers = [...chosenAnswers];
        newChosenAnswers[index] = e.target.value;
        setChosenAnswers(newChosenAnswers);
      }



    const currentQuestion = questionData[index];
    const generateOptions = currentQuestion.options.map((option, idx) => (
        <p>
            <input

                key={idx}
                type="radio"
                value={option}
                onChange={handleSelectedOption}
                checked={chosenAnswers[index] === option}
            />
            {option}
        </p>
    ))

  
    const handleSubmit = () => {
        setSubmitted(true);
        const score = chosenAnswers.reduce((totalScore, answer, i) => {
            if (answer === questionData[i].correctOption) {
                return totalScore + 1;
            }
            return totalScore;
                
        }, 0)
        setcalculatedScore(score)

    }
    return (
                <div className={styles.quiz__container}>
                    <div className={styles.quiz__card}>
                        <div className={styles.quiz__buttons}>
                            <button className={styles.button} onClick={handlePrevious}>Previous</button>
                            <button className={styles.button} onClick={handleNext}>Next</button>
                            <button className={styles.button} onClick={handleHint}>Hint</button>  
                        </div>

                        <div className={styles.hint__container}>
                            {hint && <p>{currentQuestion.hint}</p>}
                        </div>
                        
                        <h4>{index + 1} of {questionData.length} question</h4>

                        <p className={styles.question}>{questionData[index].question}</p>
                        <p>{generateOptions}</p>

                        <div className={styles.submit__container}>
                            {index === questionData.length - 1 && <button className={styles.submit__button} onClick={handleSubmit}>Submit</button>}
                        </div>
                
                    </div>

                    {submitted &&
                        <div className={styles.score__button}>
                            <h3>Results</h3>
                            <DisplayScore submitted={submitted} calculatedScore={calculatedScore}/>
                        </div>
                    }
                </div>
            )
}

