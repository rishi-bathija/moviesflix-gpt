import React from 'react'
<<<<<<< HEAD
import Body from './components/Body'
import { Provider} from 'react-redux'
import appStore from './utils/appStore'



const App = () => {

  

  return (
    <div>
      {/* <div className='text-3xl font-bold text-red-500 flex justify-center items-center h-screen border-solid'>Today we will make Moviesflix GPT</div> */}

      <Provider store={appStore}>
        <Body />
      </Provider>
=======

const App = () => {
  return (
    <div>
      <div className='text-3xl font-bold text-red-500 flex justify-center items-center h-screen border-solid'>Today we will make Moviesflix GPT</div>
>>>>>>> ce5c9a78c55424101fe931472e8659efb958ff9b
    </div>
  )
}

export default App
