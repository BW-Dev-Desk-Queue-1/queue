import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './LoginPage/LoginPage.css';
const HelperLogin = props => {
  
  let history = useHistory();
  const { register, errors, handleSubmit, formState } = useForm({
    mode: "onBlur"
  });
  
  const onSubmit = data => { 
    axios
      .post("https://dev-help-desk.herokuapp.com/api/helpers/login", data)
      .then(res => {
        console.log('login response: ', res.data)      
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', res.data.userId)
        localStorage.setItem('accessType', res.data.accessType)
        history.push('/dashboard')
      })
      .catch(err => {
        console.log(`login error`, err)      
      })
  }
 
  return (
    <div className={`login-form ${props.sh === 'helper' && props.lr === 'login' ? '' : 'hidden'}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="username"
          ref={register({required: 'true'})}
          className={`${formState.touched.username && errors.username ? 'input-error' : ''} ${formState.touched.username && !errors.username ? 'input-valid' : ''}`}
          placeholder='username'
        />
        {errors.username && <span className='error'>Username is required</span> }

        <input
          name="password"
          ref={register({required: 'true'})}
          className={`${formState.touched.password && errors.password ? 'input-error' : ''} ${formState.touched.password && !errors.password ? 'input-valid' : ''}`}
          placeholder='password'
        />
        {errors.password && <span className='error'>Password required</span> }

        <button type="submit" className={`${!errors.password && !errors.username &&formState.isValid ? 'helper white-text' : ''}`}>Login</button>
      </form>
    </div>
  );
};

export default HelperLogin
