import React, { useState, useEffect } from "react";
import "./style_recette.css";
import "./style-form.css";
import axios from "axios";
import { FaUserEdit, FaUserPlus, FaTrash } from "react-icons/fa";
import AddRecette from "./add";
import { RxAvatar } from "react-icons/rx";

const G_recette = () => {
  const [recettes, setrecettes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recette, setprf] = useState({
      nom: "",
      ingredients: "",
      etapes: "",
      duree: 0,
      photo: "",
  });
  const baseURL = "http://localhost:3000";

  useEffect(() => {
    getpof();
  }, []);
  const getpof = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      console.log(user.id)
      const credentials = btoa(`${user.username}:${user.password}`); // Assurez-vous que ces champs existent

      const res = await axios.get(`${baseURL}/recettes`, {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });      
      setrecettes(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const supprimer = async (e, id) => {
    e.preventDefault();

    try {
      await axios.delete(`${baseURL}/recettes/${id}`);
      const updatedRecettes = recettes.filter((recette) => recette.id !== id);
      setrecettes(updatedRecettes);
    } catch (e) {
      console.log(e);
    }
  };
  const ajouter = async (data) => {
    const x = [...recettes];
    x.push(data);
    try {
      const res = await axios.post(`${baseURL}/recettes`, data);
      setrecettes([...recettes, res.data]);
    } catch (e) {
      console.log(e);
    }
  };

  const modifier = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${baseURL}/recettes/${recette.id}`, recette);
      const index = recettes.findIndex((item) => item.id === recette.id);
      const updatedRecettes = [...recettes];
      updatedRecettes[index] = res.data;
      setrecettes(updatedRecettes);
      resetRecette();
      setShowModal(false);
    } catch (e) {
      console.log(e);
    }
  };
   const resetRecette = () => {
    setprf({
      nom: "",
      ingredients: "",
      etapes: "",
      duree: 0,
      photo: "",
    });
  };
  onchange = (e) => {
    setprf((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
const search = async(nom)=>{
  
      try {
        
        const res = await axios.get(`/recettes/:${nom}`);
        setrecettes(res.data);
        console.log(res.data)
      } catch (e) {
        console.log(e);
      }
    };
  return (
    <>
      <br />
      <div class="table_responsive">
        <AddRecette onClick={ajouter} />
        <br />
        <div style={{ display:"flex",}}>
      <label style={{ fontSize: '16px',margin:"auto",paddingLeft:"15%",marginLeft:"40%",marginTop:"1%", width:"35%",}}>
      choisir un recette:</label>
        <input
      type="text"
      onChange={(e) => {
        search(e.target.value);
      }}
      placeholder="Search..."
      style={{
        width: '23%',
        height: '40px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '0 12px',
      //  marginLeft: '54px'
      }}
    />
          
          </div>
          <br></br>
        <table>
          <thead>
          <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Ingredients</th>
          <th>Steps</th>
          <th>Duration</th>
          <th>Action</th>
        </tr>
          </thead>

          <tbody>
            {recettes ? (
              recettes.map((x) => (
                <tr>
                  <td>
                    <img src={"upload/" + x.image} alt="" />
                  </td>
                  <td>{x.nom}</td>
                  <td>{x.ingredients}</td>
                  <td>{x.etapes}</td>
                  <td>{x.duree}</td>

                  <td>
                    <span class="action_btn">
                      <a
                        href="#"
                        style={{ with: "80px" }}
                        onClick={() => {
                          setShowModal(true);
                          setprf(x);
                        }}
                      >
                        <FaUserEdit />
                      </a>
                      {/* <AddRecette /> */}
                      <a href="#" onClick={(e) => supprimer(e, x._id)}>
                        <FaTrash />
                      </a>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
        {showModal && (
          <div className="modal-container">
            <input id="modal-toggle" type="checkbox" checked={showModal} />
            <div className="modal-backdrop">
              <div className="modal-content">
                <label
                  onClick={() => setShowModal(false)}
                  className="modal-close"
                  htmlFor="modal-toggle"
                >
                  x
                </label>
                <div class="containerr container">
                  <div class="title">modifier  recette</div>
                  <div class="content">
                    <form action="" method="post">
                      <div class="user-details">
                        <div class="input-box">
                          <span class="details">nom</span>
                          <input
                            type="text"
                            name="Cni"
                            placeholder="Enter  nom"
                            onChange={onchange}
                            value={recette.nom}
                          />
                        </div>
                        <div class="input-box">
                          <span class="details">ingredients</span>
                          <input
                            type="text"
                            name="Name"
                            placeholder="Enter  ingredients"
                            onChange={onchange}
                            value={recette.ingredients}
                          />
                        </div>
                        <div class="input-box">
                          <span class="details">duree</span>
                          <input
                            type="text"
                            name="last_Name"
                            placeholder="Enter duree"
                            onChange={onchange}
                            value={recette.duree}
                          />
                        </div>
                        <div class="input-box">
                          <span class="details">etapes</span>
                          <input
                            type="text"
                            name="email"
                            placeholder="Enter etapes"
                            onChange={onchange}
                            value={recette.etapes}
                          />
                        </div>
                      </div>

                      <div class="button">
                        <input
                          type="submit"
                          name="valider"
                          class="btn btn-success"
                          value="modifie"
                          onClick={modifier}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <label
                  style={{
                    marginRight: "20px",
                    paddingBottom: "20px",
                    background: "#6c757d",
                    width: "60px",
                  }}
                  class="modal-close button"
                  for="modal-toggle"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default G_recette;
