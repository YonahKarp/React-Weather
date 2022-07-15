import React, {useState} from 'react'


const loadingText =[
    'Planning AI uprising',
    "Deleting System32 folder",
    "Generating witty dialog...",
    "Upgrading Windows, your PC will restart several times. Sit back and relax.",
    "...and enjoy the elevator music...",
    "I'm sorry Dave, I can't do that.",
    'You are number 2843684714 in the queue',
    'Please wait while we serve other customers...',
    'Waking up the minions',
    'Insert 3 Tokens to begin',
    "Your time is very important to us. Please wait while we ignore you...",
    "Mining some bitcoins...",
    "I swear it's almost done."
  ]

export const Loading = () => {
  
    let [rand, setRand] = useState(Math.floor(Math.random() * loadingText.length))
    
    setTimeout(() => setRand(Math.floor(Math.random() * loadingText.length)),3500)
   
 
   return <div className="Loading">
    <div id='loading'>
        <div>{loadingText[rand]}</div>
        <span></span><span></span>
        <span></span>
        <span></span><span></span>
    </div>
 </div>
 }