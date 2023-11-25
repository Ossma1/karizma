import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

const AddRecette = (props) => {
  const [avatar, setAvatar] = useState(null);
  const [recette, setRecette] = useState({
    nom: "",
    ingredients: "",
    etapes: "",
    duree: 0,
    photo: "",
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const ajouter = async (e) => {
    e.preventDefault();
    await upload();
    try {
      const res = await axios.post("/recette", recette);
      props.onClick(res.data);
      setRecette({
        nom: "",
        ingredients: "",
        etapes: "",
        duree: 0,
        photo: "",
      });
      document.getElementById("ok").style.display = `none`;
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", avatar);
      const res = await axios.post("/upload", formData);
      setRecette((prevRecette) => ({
        ...prevRecette,
        photo: res.data,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const onchange = (e) => {
    setRecette((prevRecette) => ({ ...prevRecette, [e.target.name]: e.target.value }));
  };

  return (
    <div className="modal-container">
      <input
        id="modal-toggle"
        type="checkbox"
        onClick={() => {
          document.getElementById("ok").style.display = `block`;
        }}
      />
      <button>
        <FaUserPlus />
      </button>
      <div className="modal-backdrop" id="ok">
        <div className="modal-content">
          <label className="modal-close" htmlFor="modal-toggle">
            x
          </label>
          <div className="containerr container">
            <div className="title">Create Recipe</div>
            <div className="content">
              <form action="" method="post">
                <div className="user-details">
                  <div className="input-box">
                    <span className="details">Name</span>
                    <input
                      type="text"
                      name="nom"
                      placeholder="Enter recipe name"
                      onChange={onchange}
                      value={recette.nom}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Ingredients</span>
                    <input
                      type="text"
                      name="ingredients"
                      placeholder="Enter recipe ingredients"
                      onChange={onchange}
                      value={recette.ingredients}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Steps</span>
                    <input
                      type="text"
                      name="etapes"
                      placeholder="Enter recipe steps"
                      onChange={onchange}
                      value={recette.etapes}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Duration</span>
                    <input
                      type="number"
                      name="duree"
                      placeholder="Enter recipe duration"
                      onChange={onchange}
                      value={recette.duree}
                    />
                  </div>
                  <div className="input-box">
                    <label
                      htmlFor="avatar"
                      className="block text-sm font-medium text-gray-700"
                    ></label>
                    <div className="mt-2 flex items-center">
                      <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                        {avatar ? (
                          <img
                            src={URL.createObjectURL(avatar)}
                            alt="recipe-avatar"
                            className="h-full w-full object-cover rounded-full"
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "9999px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <RxAvatar className="w-8 h-8" />
                        )}
                      </span>
                      <label
                        htmlFor="file-input"
                        className="ml-5 flex items-center justify-center px-4 py-4 border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <span>Upload a file</span>
                        <input
                          type="file"
                          name="avatar"
                          id="file-input"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileInput}
                          className="sr-only"
                        ></input>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="button">
                  <input
                    onClick={ajouter}
                    type="submit"
                    name="valider"
                    className="btn btn-success"
                    value="Validate"
                  />
                </div>
              </form>
            </div>
          </div>
          <label className="modal-close button" htmlFor="modal-toggle">
            Close
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddRecette;
