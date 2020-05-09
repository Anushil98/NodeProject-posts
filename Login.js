import React from 'react';
import axios from "axios";
import styles from './styles'

import { Redirect, Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            loggedIn: false
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3000/logout', { withCredentials: true }).then(() => { console.log('logged Out') }).catch()
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    login = (e) => {
        e.preventDefault()

        axios.post("http://localhost:3000/user", this.state, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    this.props.setUserCreds(this.state.username)
                    this.setState({ 'loggedIn': true })
                }

            })
            .catch((err) => { alert('Login Failed') })
    }

    render() {
        if (this.state.loggedIn) {
            console.log('hey from login')
            return (<Redirect to="/post" />)
        }
        return (
            <div style={styles.container}>
                <div style={styles.header} >
                <div style={{display:'flex',height:'40px'}}><img src={require("./Logo.png")} alt='LOGO'/></div>
                    <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={styles.Link}><Link style={{textDecorationLine:'none',font:'1.2em bold'}} to='/'>Sign-Up</Link></div>
                    </div>
                </div>
                <div style={styles.main}>
                <div style={styles.form}>
                        <form style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}} onSubmit={this.login}>
                            <div style={styles.inputField}>
                            Username:
                            <input type="text" value={this.state.username} name="username" onChange={this.changeHandler} /><br></br>
                            </div>
                            <div style={styles.inputField}>
                            Password:
                            <input type="password" value={this.state.password} name="password" onChange={this.changeHandler} /><br></br>
                            </div>
                            <div style={styles.inputField}>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                <input style={styles.button}  type="submit" value='Login'/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        )
    }
}

                    