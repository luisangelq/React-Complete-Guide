import { useState, useContext, useEffect } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import AuthContext from "../../context/auth/AuthContext";

const SignUp = (props) => {
  const authContext = useContext(AuthContext);
  const { alert, isAuthenticated, registerUser } = authContext;

  useEffect(() => {
    //alert
    console.log(alert);
    if (!alert) return null;

    if (alert.type === "success") {
      Swal.fire({
        icon: alert.type,
        title: "Success!",
        text: alert.msg,
        timer: 3000,
        confirmButtonColor: "#20525c",
      });
    }
    if (alert.type === "error") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: alert.msg,
        timer: 3000,
        confirmButtonColor: "#20525c",
      });
    }

    if (isAuthenticated) {
      props.history.push("/main-panel");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert, isAuthenticated]);

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    password2: "",
  });

  const [spinner, setSpinner] = useState(false);

  const { userName, email, password, password2 } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check for empty fields
    if (
      userName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      password2.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the fields!",
        timer: 3000,
        confirmButtonColor: "#20525c",
      });
      return;
    }

    //Check password 6 characters long
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters long!",
        timer: 3000,
        confirmButtonColor: "#20525c",
      });
      return;
    }

    //Check password match
    if (password !== password2) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
        timer: 3000,
        confirmButtonColor: "#20525c",
      });
      return;
    }
    setSpinner(true);

    setTimeout(() => {
      //Register user
      registerUser({
        userName,
        email,
        password,
      });
      setSpinner(false);
    }, 1000);
  };

  return (
    <UserForm>
      <ContentForm>
        <h1>Sign Up</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <FieldForm>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>

            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Your Name"
              value={userName}
              onChange={handleChange}
            />
          </FieldForm>
          <FieldForm>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={handleChange}
            />
          </FieldForm>
          <FieldForm>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              value={password}
              onChange={handleChange}
            />
          </FieldForm>
          <FieldForm>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Confirm Your Password"
              value={password2}
              onChange={handleChange}
            />
          </FieldForm>

          {spinner ? (
            <Spinner>
              <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
              </div>
            </Spinner>
          ) : (
            <div style={{ height: "5rem" }}></div>
          )}

          <FieldForm>
            <Btn type="submit" value="Register" />
          </FieldForm>
        </form>

        <LogIn to="/">Log In</LogIn>
      </ContentForm>
    </UserForm>
  );
};

const UserForm = Styled.div`
    background-color: var(--green3);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContentForm = Styled.div`
    padding: 5rem 3rem;
    max-width: 600px;
    width: 95%;
    background-color: var(--white);
    border-radius: 1rem;
    box-shadow: 0px 6px 11px -8px rgba(0,0,0,0.9);

`;

const FieldForm = Styled.div`
    display: flex;
    margin-bottom: 2rem;
    align-items: center;

    svg {
        width: 3rem;
        height: 3rem;
        margin-right: 1rem;
        fill: var(--green2);
    }

    input[type="password"],
    input[type="email"],
    input[type="text"] {
        background-color: var(--white);
        width: 100%;
        padding: 1rem;
        margin: 1rem 0;
        border: none;
        border-bottom: 2px solid var(--green2);
        font-size: 2rem;
        color: var(--black);
        font-family: var(--textFont)
    }

    input:focus {
        outline: none;
        border-bottom: 2px solid var(--green3);
    }
`;

const Spinner = Styled.div`
  .spinner {
  width: 40px;
  height: 40px;

  position: relative;
  margin: 1rem auto;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--blue2);
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
`;

const Btn = Styled.input`
    margin-top: 2rem;
    background-color: var(--blue2);
    color: var(--white);
    width: 100%;
    padding: 1rem 2rem;
    border: none;
    border-radius: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
        opacity: 80%;
    }
`;

const LogIn = Styled(Link)`
  color: var(--black);
  font-weight: bold;
  font-size: 1.8rem;
  margin-top: 2rem;
  opacity: .8;
  text-decoration: underline;
`;
export default SignUp;
