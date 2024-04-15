import React from 'react';
import { bicycle, bus, mrt, neighbourhood, sentosa } from '../../assets';

function Distance({distanceIsClicked, setDistanceIsClicked, setDistanceAnswer}){

    function selectDistance(e){
        e.preventDefault();
        setDistanceAnswer(e.target.value);
        setDistanceIsClicked(e.target.id);
    }

    return (
        <div>
            <h1 className='md:text-3xl text-l font-bold text-black-500 p-10'>How far are you willing to go?</h1>
            <div>
                <button id="1" value="1000" onClick={selectDistance} className={distanceIsClicked == 1 ? "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-red-600 text-left outline outline-[3px] outline-red-600" : "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-black text-left"}>
                    <div className="grid grid-cols-3 px-8">
                        <p>0 - 1 km</p>
                        <p className="col-span-2 text-gray-400 font-normal text-sm text-right">~ 10mins by Public Transport</p>
                    </div>
                    <img src={neighbourhood} alt="neighbourhood" className = "object-[90%] mt-4 pointer-events-none rounded-b-[40px] h-40 w-[100%] object-cover pointer-events-none"/>                 
                </button>    
                <button id="2" value="5000" onClick={selectDistance} className={distanceIsClicked == 2 ? "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-red-600 text-left outline outline-[3px] outline-red-600" : "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-black text-left"}>
                    <div className="grid grid-cols-3 px-8">
                        <p>0 - 5 km</p>
                        <p className="col-span-2 text-gray-400 font-normal text-sm text-right">~ 15mins by Public Transport</p>
                    </div>
                    <img src={bicycle} alt="bicycle" className = "object-[90%] mt-4 pointer-events-none rounded-b-[40px] h-40 w-[100%] object-cover pointer-events-none"/>     
                </button> 
                <button id="3" value="10000" onClick={selectDistance} className={distanceIsClicked == 3 ? "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-red-600 text-left outline outline-[3px] outline-red-600" : "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-black text-left"}>
                    <div className="grid grid-cols-3 px-8">
                        <p>0 - 10 km</p>
                        <p className="col-span-2 text-gray-400 font-normal text-sm text-right">~ 20mins by Public Transport</p>
                    </div>
                    <img src={bus} alt="bus" className = "object-[90%] mt-4 pointer-events-none rounded-b-[40px] h-40 w-[100%] object-cover pointer-events-none"/>
                </button> 
                <button id="4" value="20000" onClick={selectDistance} className={distanceIsClicked == 4 ? "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-red-600 text-left outline outline-[3px] outline-red-600" : "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-black text-left"}>
                    <div className="grid grid-cols-3 px-8">
                        <p>0 - 20 km</p>
                        <p className="col-span-2 text-gray-400 font-normal text-sm text-right">~ 45mins by Public Transport</p>
                    </div>
                    <img src={mrt} alt="mrt" className = "object-[90%] mt-4 pointer-events-none rounded-b-[40px] h-40 w-[100%] object-cover pointer-events-none"/>
                </button> 
                <button id="5" value="50000"  onClick={selectDistance} className={distanceIsClicked == 5 ? "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-red-600 text-left outline outline-[3px] outline-red-600" : "bg-white w-3/4 rounded-[40px] font-medium my-3 pt-4 text-black text-left"}>
                    <div className="grid grid-cols-3 px-8">
                        <p>whole of Singapore</p>
                        <p className="col-span-2 text-gray-400 font-normal text-sm text-right">~ 1h 30mins from 1 end of Singapore to the other</p>
                    </div>
                    <img src={sentosa} alt="sentosa" className = "object-[90%] mt-4 pointer-events-none rounded-b-[40px] h-40 w-[100%] object-cover pointer-events-none"/>
                </button> 
            </div>
        </div>
    );
  }

export default Distance;


