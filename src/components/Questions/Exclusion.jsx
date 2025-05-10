import React from 'react';
import { categoryAnswer } from './Category';
import { activityList, entertainmentList, foodList, othersList, shoppingList } from './ExclusionList';

let exclusionAnswer = [];
let subCategory = [];
let subCategoryAnswer = [];

function Exclusion({exclusionIsClicked, setExclusionIsClicked}){

    function selectExclusion(e){
        e.preventDefault();
        if(exclusionIsClicked.find(num => num == e.target.id) == e.target.id){
            setExclusionIsClicked(exclusionIsClicked.filter(num => num != e.target.id));
            exclusionAnswer.indexOf(e.target.value) > -1 && exclusionAnswer.splice(exclusionAnswer.indexOf(e.target.value), 1);
        }
        else{   
            exclusionAnswer.push(e.target.value);
            setExclusionIsClicked([...exclusionIsClicked, e.target.id]);
        }
        console.log(exclusionAnswer);
        subCategoryAnswer = subCategory.filter(item => !exclusionAnswer.includes(item));
        console.log(subCategoryAnswer);
    }

    function createExclusion(props){
        if (!subCategory.includes(props.value)) {
            subCategory.push(props.value);
        }
        return(
            <button value={props.value} id={props.id} onClick={selectExclusion} className={exclusionIsClicked.find(num => num == props.id) == props.id ? "bg-white w-3/4 rounded-full font-medium my-3 py-3 px-8 text-red-600 text-left outline outline-[3px] outline-red-600" : "bg-white w-3/4 rounded-full font-medium my-3 py-3 px-8 text-black text-left"}>
                {props.display}
            </button>
        );
    }

    function handleExclusion(){
        switch(categoryAnswer){
            case "food":
                subCategory.length = 0;
                return foodList.map(createExclusion);
            case "shopping":
                subCategory.length = 0;
                return shoppingList.map(createExclusion);
            case "entertainment":
                subCategory.length = 0;
                return entertainmentList.map(createExclusion);
            case "activity":
                subCategory.length = 0;
                return activityList.map(createExclusion);
            case "others":
                subCategory.length = 0;
                return othersList.map(createExclusion);
            default:
                return <h1>error</h1>
        }   
    }
    
    return (
        <div>
            <h1 className='md:text-3xl text-l font-bold text-black-500 p-10'>Do you want to exclude any Sub-categories?</h1>
            <div>
                {handleExclusion()}
            </div>
        </div>
    );
}


export default Exclusion;
export { subCategory, exclusionAnswer, subCategoryAnswer };

