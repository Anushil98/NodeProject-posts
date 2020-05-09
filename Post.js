import React from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';
import styles from './styles';
import AddPost from './addPost';
export default class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            loggedIn: false,
            toedit: null,
            showStarred: true,
        }
    }
    componentDidMount() {
        axios.get("http://localhost:3000/post", { withCredentials: true,params:{'starred':true}})
            .then(response => {

                this.setState({ 'posts': response.data })
            })
            .catch((err) => {
                this.setState({ 'loggedIn': true })
            })
    }

    deletePost = (id) => {
        axios.delete('http://localhost:3000/post', { data: { 'id': id },withCredentials:true })
            .then(() => {
                console.log('delete')
                axios.get("http://localhost:3000/post", { withCredentials: true ,params:{'starred':this.state.showStarred}})
                    .then(response => {

                        this.setState({ 'posts': response.data })
                    })
                    .catch((err) => {
                        this.setState({ 'loggedIn': true })
                    })
            })
            .catch()
    }
    editPost = (id, title, content) => {
        this.setState({ 'toedit': { 'id': id, 'title': title, 'content': content } })
    }
    starPost = (pid) => {
        axios.put("http://localhost:3000/post/star", { 'id': pid }, { withCredentials: true })
            .then(() => {
                axios.get("http://localhost:3000/post", { withCredentials: true, params:{'starred':this.state.showStarred} })
                    .then(response => {
                        this.setState({ 'posts': response.data })
                    })
                    .catch((err) => {
                        this.setState({ 'loggedIn': true })
                    })
            })
            .catch()
    }

    toggleStarred = (starred) =>{
        axios.get("http://localhost:3000/post",{ withCredentials: true,params:{'starred':!starred}})
            .then(response => {
                this.setState({ 'posts': response.data,'showStarred':!starred })
            })
            .catch((err) => {
                this.setState({ 'loggedIn': true })
            })
    }
    reset = () => {
        this.setState({ 'toedit': null })
        axios.get("http://localhost:3000/post", { withCredentials: true,params:{'starred':this.state.showStarred} })
            .then(response => {

                this.setState({ 'posts': response.data })
            })
            .catch((err) => {
                this.setState({ 'loggedIn': true })
            })
    }

    render() {
        if (this.state.loggedIn === true) {
            return (<Redirect to='/login' />)
        }
        if (this.state.toedit != null) {
            console.log("from editor")

            return (<AddPost id={this.state.toedit} reset={this.reset} />)
        }
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', height: '40px' }}><img src={require("./Logo.png")} alt='LOGO' /></div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={styles.Link}><Link style={{ textDecorationLine: 'none', font: '1.2em bold' }} to='/addPost'>Add Post</Link></div>
                        <div style={styles.Link}><Link style={{ textDecorationLine: 'none', font: '1.2em bold' }} to='/login'>Logout</Link></div>
                    </div>
                </div>
                <div>
                    <button style={styles.button} onClick={()=>{this.toggleStarred(this.state.showStarred)}}>{this.state.showStarred ? <span>See Un-starred</span> : <span>See Starred</span>}</button>
                </div>
                <div style={{ ...styles.main, justifyContent: 'flex-start' }}>

                    <div style={styles.postList}>
                        {
                            this.state.posts.map((post) => {
                                return (
                                    <div key={post._id} style={{ display: 'flex', flexDirection: 'column', boxShadow: '1px 1px 1px grey', backgroundColor: '#c2d6ed', margin: '5px' }}>
                                        <div style={{ font: '1.5em monospace' }}>{post.title}</div>
                                        <div style={{ margin: '5px', backgroundColor: '#d6e4ed' }}>{post.content}</div>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div><button style={styles.button} onClick={() => { this.deletePost(post._id) }}>Delete</button></div>
                                            <div><button style={styles.button} onClick={() => { this.editPost(post._id, post.title, post.content) }}>Edit</button></div>
                                            <div><button style={{ ...styles.button, boxShadow: 'none', backgroundColor: 'transparent', borderColor: 'transparent' }} onClick={() => { this.starPost(post._id) }}>{post.starred === true ? <span role='img' aria-label='star'>&#11088;</span> : <span role='img' aria-label='un-star'>	&#10032;</span>}  </button></div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>

        )
    }
}