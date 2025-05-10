import React from 'react'

function ReviewCard(props){
  return (
    <div className='bg-gray-100 rounded-lg py-4 px-6 mt-2 mb-4'>
        <img src={props.profilePhoto} className='w-10 mr-4 float-left'/>
        <h1 className='py-2'>{props.name}</h1>
        <h1 className='mt-3'>Rating: {props.rating}/5</h1>
        <h1 className='mt-2 font-bold'>Review:</h1>
        <h1 className='mt-0.5'>{props.review}</h1>
        <h1 className='mt-3 text-sm'>Date Published: {props.time}</h1>
    </div>
  )
}

export default ReviewCard