import React from 'react';
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import styles from './styles';

export default class AddPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.id != null ? props.id.title : "",
            content: props.id != null ? props.id.content : "",
            starred:true,
            loggedIn: true
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3000/post', { withCredentials: true }).then().catch(() => {
            console.log('Redirecting')
            this.setState({ 'loggedIn': false })
        })
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitHandler = (e) => {
        e.preventDefault()
        if (this.props.id == null) {
            axios.post('http://localhost:3000/post', this.state, { withCredentials: true })
                .then(() => {

                    this.setState({ 'title': '', 'content': '' })
                })
                .catch((err) => { console.log(err) })
        }
        else {
            axios.put('http://localhost:3000/post', { ...this.state, 'id': this.props.id.id }, { withCredentials: true })
                .then(() => {
                    this.setState({ 'title': '', 'content': '' })
                })
                .catch((err) => { console.log(err) })

        }
    }

    render() {
        if (this.state.loggedIn === false) {
            return (<Redirect to='/login' />)
        }
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', height: '40px' }}><img src={require("./Logo.png")} alt='LOGO' /></div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={styles.Link}><Link style={{textDecorationLine:'none',font:'1.2em bold'}} to="/login">Logout</Link></div>
                        <div style={styles.Link}><Link style={{textDecorationLine:'none',font:'1.2em bold'}} to='/post' onClick={this.props.reset}>See Post</Link></div>
                    </div>
                </div>
                {this.props.id != null ? <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}><h2>Edit Form</h2></div> : <span></span>}
                <div style={styles.main}>

                <div style={styles.form}>
                        <form style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}} id='postForm' onSubmit={this.submitHandler}>
                            <div style={styles.inputField}>
                            Title:
                        <input type="text" value={this.state.title} name='title' onChange={this.changeHandler} /><br></br>
                            </div>
                            <div style={styles.inputField}>
                            Content:
                        <textarea value={this.state.content} form='postForm' name='content' onChange={this.changeHandler} /><br></br>
                            </div>
                            <div style={styles.inputField}>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                <input type="submit" style={styles.button} form="postForm" value={this.props.id != null ?'Edit Post':'Add Post'}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

                    
                