
import app from '@/app/Shared/firebaseConfig'

import React, { useEffect } from 'react'
import PinItem from './PinItem'

function PinList({listOfPins}) {
   console.log(listOfPins)
  return (
    <div lassName='mt-7 px-2 md:px-5
    columns-2 md:columns-3
    lg:columns-4 mb-4
    xl:columns-5 space-y-6 mx-auto'>
      {listOfPins.map((items,index)=>(
        <PinItem pin={items}/>
        </div>
      ))}
    </div>
  )
}

export default PinList