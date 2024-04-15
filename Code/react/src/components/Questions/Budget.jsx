import React from 'react';
import park from '../../assets/park.jpg';

let budgetAnswer;

function Budget({budgetIsClicked, setBudgetIsClicked}){

    function selectBudget(e){
        e.preventDefault();
        budgetAnswer = e.target.value;
        setBudgetIsClicked(e.target.id);
        console.log(budgetAnswer);
        return(budgetAnswer);
    }   

    return (
        <div className="my-100">
            <h1 className='md:text-3xl text-l font-bold text-black-500 p-10'>What is your Budget range?</h1>
            <div>
                <button id="1" value="0" onClick={selectBudget} className={budgetIsClicked == 1 ? "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-red-600 text-left outline outline-[3px] outline-red-600" : "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-black text-left"}>
                    <div className="grid grid-cols-3 px-8">
                        <p>Free</p>
                        <p className="col-span-2 text-gray-400 font-normal text-sm text-right">Parks, Shopping Mall (Window Shopping), Historical Sites, Library</p>
                    </div>
                    <img src={park} alt="park" className = "object-[90%] mt-4 pointer-events-none rounded-b-[40px] h-40 w-[100%] object-cover pointer-events-none"/>                 
                    {/* <img src={parkimg} alt="park" className = "size-48 float-right rounded-full pointer-events-none"/> */}
                </button> 
                <button id="2" value="1" onClick={selectBudget} className={budgetIsClicked == 2 ? "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-red-600 text-left outline outline-[3px] outline-red-600" : "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-black text-left"}>
                    <div className="grid grid-cols-3 px-8">
                        <p>$</p>
                        <p className="col-span-2 text-gray-400 font-normal text-sm text-right">Food Court, Cheap Restaurants, Fast Food, </p>
                    </div>
                    <img src={park} alt="park" className = "object-[90%] mt-4 pointer-events-none rounded-b-[40px] h-40 w-[100%] object-cover pointer-events-none"/>
                </button>    
                <button id="3" value="2" onClick={selectBudget} className={budgetIsClicked == 3 ? "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-red-600 text-left outline outline-[3px] outline-red-600" : "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-black text-left"}>
                    <div className="grid grid-cols-3 px-8">
                        <p>$$</p>
                        <p className="col-span-2 text-gray-400 font-normal text-sm text-right">Cafes, Restaurants, </p>
                    </div>
                    <img src={park} alt="park" className = "object-[90%] mt-4 pointer-events-none rounded-b-[40px] h-40 w-[100%] object-cover pointer-events-none"/>
                </button> 
                <button id="4" value="3" onClick={selectBudget} className={budgetIsClicked == 4 ? "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-red-600 text-left outline outline-[3px] outline-red-600" : "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-black text-left"}>
                    <div className="grid grid-cols-3 px-8">
                        <p>$$$</p>
                        <p className="col-span-2 text-gray-400 font-normal text-sm text-right">Parks, Shopping Mall (Window Shopping), Historical Sites</p>
                    </div>
                    <img src={park} alt="park" className = "object-[90%] mt-4 pointer-events-none rounded-b-[40px] h-40 w-[100%] object-cover pointer-events-none"/>
                </button> 
                <button id="5" value="4" onClick={selectBudget} className={budgetIsClicked == 5 ? "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-red-600 text-left outline outline-[3px] outline-red-600" : "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-black text-left"}>
                    <div className="grid grid-cols-3 px-8">
                        <p >$$$$</p>
                        <p className="col-span-2 text-gray-400 font-normal text-sm text-right">Parks, Shopping Mall (Window Shopping), Historical Sites</p>
                    </div>
                    <img src={park} alt="park" className = "object-[90%] mt-4 pointer-events-none rounded-b-[40px] h-40 w-[100%] object-cover pointer-events-none"/>
                </button> 
            </div>
        </div>
    );
  }

export default Budget;
export { budgetAnswer };

