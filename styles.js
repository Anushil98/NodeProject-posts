const styles = {
    container:{
        backgroundColor: 'aliceblue',
        display:'flex',
        flex:1,
        flexDirection: 'column',
        justifyContent:'center'
    },
    header:{
        display:'flex',
        backgroundColor: 'aquamarine',
        flex:1,
        borderBottom: '1px solid',
        marginBottom: '10px',
        padding: '10px',
        boxShadow:'1px 1px grey',
        justifyContent:'space-between'

    },
    main:{
        display:'flex',
        flex:5,
        flexDirection:'row',
        justifyContent:'center',
        padding:'10px'
    },Link:{
        padding:'20px',
        backgroundColor:'#c2d6ed',
        marginRight:'10px',
        boxShadow:'1px 1px 1px grey'
    },
    form:{
        backgroundColor:'#c2d6ed',
        boxShadow:'5px 5px 5px grey',
        padding: '50px'
    },
    postList:{
        display:'flex',
        flexDirection:'column',
        width:'100%'

    },
    button:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        margin:'5px',
        backgroundColor:'white',
        border:'1px solid white',
        boxShadow:'2px 2px 2px grey'
    },
    inputField:{
        display:'flex',
        flexDirection:'column',
        
    }
}

export default styles;