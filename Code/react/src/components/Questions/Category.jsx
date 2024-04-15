import React from 'react';
import { bagicon, cupicon, dumbbellicon, mapicon, movieicon } from '../../assets';

let categoryAnswer;

function Category({categoryIsClicked, setCategoryIsClicked}){
  function selectCategory(e){
    e.preventDefault();
    categoryAnswer = e.target.value;
    setCategoryIsClicked(e.target.id);
    console.log(categoryAnswer);
    return(categoryAnswer);
  }

    return (
      <div className="ml-20 mr-24">
        <h1 className='md:text-3xl text-l font-bold text-black-500 p-10'>Choose your Category!</h1>
        <div className="grid grid-cols-11 gap-3">
          <div className="col-span-3 font-semibold md:text-xl text-m">
            <button id="1" value="food" onClick={selectCategory} className={categoryIsClicked==1 && "bg-white rounded-lg outline outline-red-600 outline-[3px] text-red-600"}>
              <div className="w-56 h-56 pointer-events-none">
                <img src={cupicon} className="pointer-events-none size-40 mx-auto ml-10"></img>
                Food
              </div>
            </button>
          </div>
          <div className="col-start-5 col-span-3 font-semibold md:text-xl text-m">
            <button id="2" value="shopping" onClick={selectCategory} className={categoryIsClicked==2 && "bg-white rounded-lg outline outline-red-600 outline-[3px] text-red-600"}>
              <div className="w-56 h-56 pointer-events-none">
                <img src={bagicon} className="pointer-events-none size-40 mx-auto"></img>
                Shopping
              </div>
            </button>  
          </div>
          <div className="col-start-9 col-span-3 font-semibold md:text-xl text-m">
            <button id="3" value="entertainment" onClick={selectCategory} className={categoryIsClicked==3 && "bg-white rounded-lg outline outline-red-600 outline-[3px] text-red-600"}>
              <div className="w-56 h-56 pointer-events-none">
                <img src={movieicon} className="pointer-events-none size-40 mx-auto mr-9"></img>
                Entertainment
              </div>
            </button>
          </div>
          <div className="col-start-3 col-span-3 font-semibold md:text-xl text-m mt-2">
            <button id="4" value="activity" onClick={selectCategory} className={categoryIsClicked==4 && "bg-white rounded-lg outline outline-red-600 outline-[3px] text-red-600"}>
              <div className="w-56 h-56 pointer-events-none">
                <img src={dumbbellicon} className="pointer-events-none size-40 mx-auto"></img>
                Activities
              </div>
            </button>
          </div>
          <div className="mt-2 col-start-7 col-span-3 font-semibold md:text-xl text-m">
            <button id="5" value="others" onClick={selectCategory} className={categoryIsClicked==5 && "bg-white rounded-lg outline outline-red-600 outline-[3px] text-red-600"}>
              <div className="w-56 h-[204px] pointer-events-none">
                <img src={mapicon} className="pointer-events-none my-5 size-36 mx-auto mb-[-5px] pb-3"></img>
                Others
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

export default Category;
export { categoryAnswer };

