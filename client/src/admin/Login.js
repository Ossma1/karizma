import React, { useState, useEffect } from "react";
import "./style_login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const login = async (user) => {
    try {
      const res = await axios.post("http://localhost:3000/utilisateurs/login", user);
      return res.data;
    } catch (e) {
      console.error("Erreur d'authentification", e);
      alert("email or motpass not found")
    }
  };
  const Navigate = useNavigate();
  useEffect(() => {}, []);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(inputs)
      const res = await login(inputs);
      if (res) {
        localStorage.setItem("user", JSON.stringify(res));
        Navigate("/user/recettes", { state: { id: res._id } });
      }
      
    } catch (err) {
      console.log(err);
      // toast.error("erreur autontification", { position: "top-center" }); // new line
    }
  };

  return (

    <div style={{ marginTop: "-100px" }} class="form_bg  ">
      <div class="container" style={{}}>
        <div
          style={{ margin: "auto" }}
          class=" col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6"
        >

          <div className="ok">
            <form class="form_horizontal" action="acceuil.html">
              <input type="hidden" name="add_supp" value="1" />
              <div class="form_icon">
                <i class="fa fa-user-circle"></i>
              </div>
              <h3 class="title"> login form </h3>
              <div class="form-group">
                <span class="input-icon">
                  <i class=" fa fa-user "> </i>
                </span>
                <input
                  value={inputs.email}
                  name="email"
                  class="form-control"
                  type="text"
                  placeholder="email"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <span class="input-icon">
                  <i class="fa fa-lock"> </i>
                </span>
                <input
                  onChange={handleChange}
                  value={inputs.password}
                  name="password"
                  class="form-control"
                  type="password"
                  placeholder=" password "
                />
              </div>
              <br />
              <button
                name="login"
                style={{ width: "30%" }}
                onClick={handleSubmit}
                class="btn signin"
              >
                login
              </button>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
