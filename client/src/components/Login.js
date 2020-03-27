import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import './Login.css';

export const Login = (props) => {
  // handle submit function and set state w/ useState ... confirm protects
  const [form, setForm] = useState ({
      username:'',
      password:'',
  })
  console.log(form);

  // make a post request to retrieve a token from the api
  const handleSubmit = (event) => {
      event.preventDefault()
      axiosWithAuth().post('/login', form)
      .then(response => {
          console.log(response)
          localStorage.setItem('token', response.data.payload)
          // when you have handled the token, navigate to the BubblePage route
          props.history.push('/protected')
      })
      .catch(err => console.table(err))
  }

  return(
    <div className='app-cont'>
      <h1>Welcome to the Bubble App!</h1>
        <form className="form-1" onSubmit={handleSubmit}>
        <input
            name='username'
            type='text'
            placeholder='User name'
            value={form.username}
            onChange={(event) => {
                setForm({
                    ...form,
                    [event.target.name]:event.target.value
                })
            }}
            />
        <input
            name='password'
            type='password'
            placeholder='Password'
            value={form.password}
            onChange={(event) => {
                setForm({
                    ...form,
                    [event.target.name]:event.target.value
                })
            }}
            />
            <button type='submit'>Submit</button>
        </form>
      </div>
  )
}