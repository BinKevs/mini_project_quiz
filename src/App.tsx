import React, {useState} from 'react';
import {fetchQuizQuestions, QuestionState, Difficulty} from './API.ts';
import QuestionCard from './components/QuestionCard.tsx';
import QUIZ_PIC from './static/MiniQuiz_left_side_pic.JPG'
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 10;
function App() {
  const [loading, setLoading] = useState(false);
  const [question, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setgameOver] = useState(true);

  const startTrivia = async () => {
    
    setLoading(true);
    setgameOver(false);
     
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
   
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
     
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    const answer = e.currentTarget.value;
    const correct = question[number].correct_answer === answer;
    if (correct) {setScore((prev) => prev+1)}
    const answerObject = {
      question: question[number].question,
      answer,
      correct,
      correctAnswer: question[number].correct_answer,
    };
    setUserAnswer((prev) => [...prev, answerObject]);
  };
  const nextQuestion = () =>  {
    const aux = number+1;
    if (aux === TOTAL_QUESTIONS) {
      setgameOver(true);
    } else {
      setNumber(aux);
    }
  }
  return (
    <div className={`bg-[#F4CB04]  flex md:flex-row flex-col ${!loading && !gameOver && userAnswer.length !== TOTAL_QUESTIONS ?  'h-full' : 'h-screen'} `}>
      <div className='md:w-1/2 w-full flex '>
          <img src={QUIZ_PIC} alt="" />
      </div>
       {loading ?   (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
        <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
      </div>
      ) : null}
      <div className='md:w-1/2 w-full relative'>
      <div>
        {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
          <div className="md:absolute top-0 left-0 right-0 bottom-0 md:h-screen md:my-0 my-20 z-50 overflow-hidden opacity-75 flex flex-col items-center justify-center">
            <div className=' m-auto space-y-4'>
{ userAnswer.length === TOTAL_QUESTIONS ? (<p className="score text-center text-4xl">Your Final Score : {score} </p>) : null}
            <button onClick={startTrivia} className=" bg-white border-4 border-black text-black px-32 py-3 rounded-md text-3xl font-medium hover:bg-black hover:border-white hover:text-white opacity-100 transition duration-300">  {userAnswer.length === TOTAL_QUESTIONS ? 'Start Again' : 'Start'} </button>
            </div>
            
          </div>
        ) : null}
        
     { !gameOver && userAnswer.length !== TOTAL_QUESTIONS ? (<p className="score text-center text-4xl my-8">Score : {score} </p>) : null}
      {!loading && !gameOver && userAnswer.length !== TOTAL_QUESTIONS ? 
       (
      <div className={gameOver ? '!hidden' : ' text-center' }>
        <div className=' md:text-9xl text-5xl text-left ml-20'>
          <i className="fa fa-quote-right" aria-hidden="true"></i>
        </div>
       <QuestionCard 
        questnumb = {number+1}
        totalQuestions = {TOTAL_QUESTIONS}
        question={question[number].question}
        answer={question[number].answers}
        userAnswer = {userAnswer ? userAnswer[number] : undefined}
        callback={checkAnswer}
        />
      </div>
        ) : null 
       }

      {(!gameOver && userAnswer.length === number+1 && number !== TOTAL_QUESTIONS-1) ? (
        <div className='w-full flex justify-center my-10'>
      <button className='bg-white border-4 border-black text-black px-32 py-3 rounded-md text-xl font-medium hover:bg-black hover:border-white hover:text-white opacity-100 transition duration-300 mx-auto' onClick={nextQuestion}>next question</button>
      </div>
      ) : null}
      </div>
      </div>
      <div className=' absolute bottom-0 left-5'>
Inspired By KOLEIN
      </div>
    </div>
  );
}

export default App;
