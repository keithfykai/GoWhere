import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Budget, { budgetAnswer } from '../components/Questions/Budget';
import Category, { categoryAnswer } from '../components/Questions/Category';
import Distance from '../components/Questions/Distance';
import Exclusion, { subCategory, subCategoryAnswer, exclusionAnswer } from '../components/Questions/Exclusion';
let cat = undefined;

const answers = {
  category: undefined,
  exclusion: [],
  // budget: undefined,
  distance: undefined
};

export const Questionnaire = () => {
  const [step, setStep] = useState(1)
  const [categoryIsClicked, setCategoryIsClicked] = React.useState(0);
  const [exclusionIsClicked, setExclusionIsClicked] = React.useState([]);
  // const [budgetIsClicked, setBudgetIsClicked] = React.useState(0);
  const [distanceIsClicked, setDistanceIsClicked] = React.useState(0);
  const [distanceAnswer, setDistanceAnswer] = useState(undefined);

  function categoryChange(){
    if(categoryIsClicked != cat){
      setExclusionIsClicked([]);
      exclusionAnswer.length = 0;
      subCategoryAnswer.length = 0;
    }
  }

  function back(e){
    if(step == 2){
      cat = categoryIsClicked;
    }
    setStep(step - 1);
    e.preventDefault();
  }

  function next(e){
    e.preventDefault();
    if(step == 1){
      categoryChange();
    }
    if(step == 1 && categoryAnswer == undefined){
      return alert("Please select a category");
    }
    // if(step == 3 && budgetAnswer == undefined){
    //   return alert("Please select a budget");
    // }
    setStep(step + 1);
  }

  function error(e){
    e.preventDefault();
    console.log(distanceAnswer);
    alert("Please select a distance");
    return <Distance />;
  }

  function results(){
    answers.category = categoryAnswer;
    if(subCategoryAnswer.length == 0){
      answers.exclusion = subCategory;
    }
    else{
      answers.exclusion = subCategoryAnswer;
    }
    
    // answers.budget = budgetAnswer;
    answers.distance = distanceAnswer;
    console.log(answers);
  }

  function handleStep(){
    switch(step){
      case 1: 
        return <Category categoryIsClicked = {categoryIsClicked} setCategoryIsClicked = {setCategoryIsClicked} />
      case 2: 
        return <Exclusion exclusionIsClicked = {exclusionIsClicked} setExclusionIsClicked = {setExclusionIsClicked} />
      case 3: 
        return <Distance distanceIsClicked = {distanceIsClicked} setDistanceIsClicked = {setDistanceIsClicked} distanceAnswer={distanceAnswer} setDistanceAnswer={setDistanceAnswer}/>  
        // return <Budget budgetIsClicked = {budgetIsClicked} setBudgetIsClicked = {setBudgetIsClicked} />
      // case 4: 
      //   return <Distance distanceIsClicked = {distanceIsClicked} setDistanceIsClicked = {setDistanceIsClicked} distanceAnswer={distanceAnswer} setDistanceAnswer={setDistanceAnswer}/>
      default:
        return setStep(1)
    }
  }

  return (
    <div className='mt-14 mb-24 max-w-[900px] w-full mx-auto text-center flex flex-col justify-center'>
        <div className='grid grid-cols-1 grid-row'>
            <div className='mb-9'>
                <h1 className='md:text-4xl text-l font-bold text-black-500'>
                    Before we explore... 
                </h1>
            </div>
        </div>
        <div className='bg-gray-200 rounded-lg py-4'>
            <form>
                <div>
                  {handleStep()}
                </div>
                <div className="flex justify-end mx-24">
                  <div className="mx-3">{step!=1 && <button onClick = {back} className='bg-white mx-3 w-[150px] rounded-full font-medium my-6 py-3 text-black'>Back</button>}</div>
                  <div>{step!=3 ? <button onClick = {next} className='bg-red-500 w-[150px] rounded-full font-medium my-6 mx-auto py-3 text-white'>Next</button> : (distanceAnswer!=undefined ? <Link to='/map'><button onClick={results} className='bg-red-500 w-[150px] rounded-full font-medium my-6 mx-auto py-3 text-white'>Submit</button></Link>:<button onClick={error} className='bg-red-500 w-[150px] rounded-full font-medium my-6 mx-auto py-3 text-white'>Submit</button>)}</div>
                </div>
            </form>
        </div>

      {/* <div className='next'>
        <Link to='/map'><button className='bg-red-500 w-[150px] rounded-full font-medium my-6 mx-auto py-3 text-white'>Go to Map</button></Link>
      </div> */}
    </div>
    
  )
}

export {answers};


// do randomise category thing
// connect answers to ur api google places thing
// do up styling for budget and distance