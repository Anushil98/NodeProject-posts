import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Post from "./Post";
import SignUp from "./SignUp";
import AddPost from "./addPost";

export default class App extends React.Component {
  constructor() {
    super()
    this.state={
      username:"",
      password:"",
    }
  }

  setCurrentUser=(username)=>{
    this.setState({'username':username})
  }
  getCurrentUser=()=>{
    return this.state.username
  }

  render() {
    console.log('from the router')
    return (
      <Router>
        <Route path="/" exact strict render={() => {
          return (<SignUp />)
        }} />
        <Route path="/login" exact strict render={() => {
          return (<Login setUserCreds={this.setCurrentUser}/>)
        }} />
        <Route path="/addPost" exact strict render={() => {
          return (<AddPost getUserCreds={this.getCurrentUser}/>)
        }} />
        <Route path="/post" exact strict render={() => {
          return (<Post getUserCreds={this.getCurrentUser}/>)
        }} />
      </Router>
    )
  }
}