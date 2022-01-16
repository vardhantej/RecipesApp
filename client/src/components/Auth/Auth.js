import React,{useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
//import {signin, signup} from '../../actions/auth';
import useStyles from './styles';
//import Icon from './icon';
import {useNavigate} from 'react-router-dom';

import * as api from '../../api/index.js';

const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''};

export default function Auth({isLoggedOut,setIsLoggedOut}) {

    //temporary
    const [isSignup,setIsSignup]=useState(true);
    
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState(initialState);
    
    const switchMode=()=>{
        setIsSignup(!isSignup);
        setShowPassword(false);
    }
    
    let navigate=useNavigate();
    const classes= useStyles();
    
    const handleShowPassword=()=>{
        setShowPassword((prevShowPassword)=>!prevShowPassword);
        
    }

    const handleSubmit= async (e)=>{
        
        e.preventDefault();
        try {
            if(isSignup){
                const {data} = await api.signUp(formData); //This data contains result and token
                localStorage.setItem('profile',JSON.stringify(data));
                navigate('/home');
                setIsLoggedOut(!isLoggedOut);
                
            }else{
                const {data} = await api.signIn(formData);
                localStorage.setItem('profile',JSON.stringify(data));
                navigate('/home');
                setIsLoggedOut(!isLoggedOut);
            }    
        } catch (error) {
            console.log(error);
        }
        
       

    }

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    
    return (
        <div className={classes.outerContainer}>
            <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                </Avatar>

            <Typography variant="h5">{isSignup?'Sign Up':'Sign In'}</Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                            {isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange}  half />
                                    </>
                            )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type= {showPassword? 'text':'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>

                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                    {isSignup? 'Sign Up' : 'Sign In'}
                </Button>

                <Grid container justify="center">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                </Grid>

            </form>
            
            </Paper>

            </Container>
        </div>
    )
}
