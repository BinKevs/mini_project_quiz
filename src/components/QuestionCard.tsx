import React from 'react'
import {AnswerObject} from '../App';
import {ButtonWrapper } from '../styles/buttons.tsx'
type Props = {
  question: string,
  answer: string[],
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
  userAnswer: AnswerObject | undefined,
  questnumb: number,
  totalQuestions: number
};

const QuestionCard: React.FC<Props> = ({question, answer, callback, userAnswer, questnumb, totalQuestions}) =>
(  
<div> 
    <p className='text-3xl mx-10 font-bold'> {questnumb } / {totalQuestions}</p>
    <p className=" text-4xl mx-10 my-10" dangerouslySetInnerHTML={{__html: question}}></p>
   
    <div>
      {answer.map((answer) => (
        <ButtonWrapper key={answer} correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer} >
          <button className={`  md:min-w-[405px] md:w-[405] my-4  text-black px-32 py-3 rounded-md text-2xl font-medium hover:bg-[#EBAB03] hover:text-white hover:border-4 border-4 border-black hover:border-white transition duration-300`} disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html: answer}}></span>
          </button>
        </ButtonWrapper>
      ))}
    </div>
    </div>
); // :o


export default QuestionCard;