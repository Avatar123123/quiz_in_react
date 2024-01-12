import React from 'react';
import { questionData } from './data/questionData';
import { calculateGrade } from './calculateGrade';



export default function DisplayScore (props) {
    if (props.submitted) {
        let percentage = (props.calculatedScore /questionData.length) * 100;
        return (
            <div>
                <p>You have scored <b>{props.calculatedScore} / {questionData.length}</b></p>
                <p>Percentage: <b>{percentage}%</b></p>
                <p>Grade: <b>{calculateGrade(percentage)}</b></p>
            </div>
        )
    }
}

