import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authenticate, isAuth, signupSignin } from "../actions/auth";
import Layout from "../components/Layout";

const LoginSignup = ({ formName }) => {

  const navigate = useNavigate()

  const [values, setValues] = useState({
    useremail : "",
    username : "",
    password : "",
    loading : false
  })

  const {username, password, useremail, loading} = values

  const handleChange = name => e =>{
    setValues({...values, [name] : e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    //submit
    signupSignin(formName, {username, useremail, password}).then((data)=>{
      if(data.error){
        toast.error(data.error)
      }
      else if(formName == "Login"){
          authenticate(data,()=>{
            if(isAuth() && isAuth().role == 1){
              navigate('/')
            }else{
              navigate('/login')
            }
          })
      }else{
        setValues({...values, username : "", password : "", useremail : "", loading : false })
        toast.success(data.message);
        navigate('/login')
      }
    })
  }


  return (
    <Layout>
      <div className="container-fluid mt-6 p-0 login">
        <div class="sidenav">
          <div class="login-main-text">
            <h2>
              Welcome to the
              <br /> {formName} page
            </h2>
            <p>Login or register from here to access.</p>
          </div>
        </div>
        <div class="main">
          <div class="col-md-6 col-sm-12">
            <div class="login-form">
              <form id="login-form" class="form" onSubmit={handleSubmit}>
                <h3 class="text-center text-info">{formName}</h3>
                { formName!="Login" && <div class="form-group mb-3">
                  <label for="username" class="text-info">
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    class="form-control"
                    value={username}
                    onChange = {handleChange("username")}
                    required
                  />
                </div>}
                <div class="form-group mb-3">
                  <label for="username" class="text-info">
                    Useremail:
                  </label>
                  <input
                    type="text"
                    name="useremail"
                    id="useremail"
                    class="form-control"
                    value={useremail}
                    onChange = {handleChange("useremail")}
                    required
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="password" class="text-info">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    value={password}
                    onChange = {handleChange("password")}
                    required
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    type="submit"
                    name="submit"
                    class="btn btn-info btn-md"
                    value="submit"
                  />
                </div>
                {formName == "Login" ? (
                  <div id="register-link" class="text-right">
                    Don't have an account ?
                    <Link to="/signup" class="text-info">
                      Register here
                    </Link>
                  </div>
                ) : (
                  <div id="register-link" class="text-right">
                    Have an account ?
                    <Link to="/login" class="text-info">
                      Login
                    </Link>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginSignup;
