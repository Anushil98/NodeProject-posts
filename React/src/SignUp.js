import React from 'react';
import axios from "axios";
import styles from './styles'
import { Redirect, Link } from "react-router-dom";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            rePass: "",
            signedUp: false
        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    signup = (e) => {
        e.preventDefault()
        if(this.state.password!==this.state.rePass){
            alert('Passwords Do no Match')
            return
        }
        axios.post("http://localhost:3000/signup", this.state, { withCredentials: true })
            .then(response => {
                console.log('Successfull login')
                this.setState({ 'signedUp': true })
            })
            .catch((err) => { alert('Credentials Not Available') })
    }

    render() {
        if (this.state.signedUp === true) {
            console.log("Hey")
            return (<Redirect to="/login" />)
        }
        return (
            <div style={styles.container}>
                <div style={styles.header} >
                    <div style={{ display: 'flex', height: '40px' }}><img src={require("./Logo.png")} alt='LOGO' /></div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={styles.Link}><Link style={{textDecorationLine:'none',font:'1.2em bold'}} to="/login">Log-In</Link></div>
                    </div>

                </div>
                <div style={styles.main}>
                    <div style={styles.form}>
                        <form style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}} onSubmit={this.signup}>
                            <div style={styles.inputField}>
                                Username:
                                <input type="text" value={this.state.username} name="username" onChange={this.changeHandler} /><br></br>
                            </div>
                            <div style={styles.inputField}>
                                Password:
                                 <input type="password" value={this.state.password} name="password" onChange={this.changeHandler} /><br></br>
                            </div>
                            <div style={styles.inputField}>
                                Re-Type Password:
                                <input type="password" value={this.state.rePassword} name="rePass" onChange={this.changeHandler} /><br></br>
                            </div>
                            <div style={styles.inputField}>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                    <input style={styles.button} type="submit" value='SignUp'/>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        )
    }
}