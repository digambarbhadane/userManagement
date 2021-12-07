import './App.css';
import UserList from './components/UserList';
import {Switch, Route} from 'react-router-dom';
import UserForm from './components/UserForm';

function App() {
  return (
   <>
    <Switch>
      <Route exact path="/" component={UserList}/>
      <Route exact path="/user" component={UserForm}/>
      <Route exact path="/user/:id" component={UserForm}/>
    </Switch>
   </>
  );
}

export default App;
