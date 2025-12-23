import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./SignUp.module.css";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
function Auth() {
  const [email, setEmail] = useState();
  const [password, setPasswordd] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState({
    signIn: false,
    signUP: false,
  });
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);
  console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo)
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          // console.log(err)
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUP: true });

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo)
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUP: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          // console.log(err)
          setError(err.message);
          setLoading({ ...loading, signUP: false });
        });
    }
  };
  return (
    <section className={classes.login}>
      {/* {Logo} */}
      <Link to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/2560px-Amazon_2024.svg.png" />
      </Link>
      <div className={classes.login_container}>

        <h1>Sign In</h1>
        { navStateData?.state?.msg &&(
          <small
          style={{
            padding:"5px",
            textAlign:"center",
            color:"red",
            fontWeight: "bold"
          }}      
          >
            {navStateData?.state?.msg}

          </small>
        )

        }
        <form>
          <div>
            <label htmlFor="password">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPasswordd(e.target.value)}
              type="password"
              id="password"
            ></input>
          </div>
          <button
            name="signin"
            type="submit"
            onClick={authHandler}
            className={classes.login_signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        {/* aggrment */}
        <p>
          By continuing, in you agree to Amazon's Fake Account conditions of use
          and sale. Please see our Privacy Notice, our Cookies Notice and our
          interest based ads Notice.
        </p>
        <button
          name="signup"
          type="submit"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
          {loading.signUP ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "  Creat your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "13px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
