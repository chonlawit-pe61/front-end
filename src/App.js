import React from 'react'
import { Route,Switch } from 'react-router-dom'
import FbLogin from './component/facebook/facebook'
import ShowData from './component/showData/ShowData'
export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={FbLogin}/>
        <Route exact path="/ShowData" component={ShowData}/>
      </Switch>  
    </div>
  )
}
