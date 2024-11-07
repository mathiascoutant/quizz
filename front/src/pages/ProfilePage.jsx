import { useContext, useEffect, useState } from "react";
import RegisterPage from "./RegisterPage";
import { useSessionStore } from "../store/session.store";
import "./ProfilePage.css";
function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  const session = useSessionStore((state) => state.session);
  const [newData, setNewData] = useState({
    firstname: session.user.firstname,
    lastname: session.user.lastname,
    username: session.user.pseudo,
    email: session.user.email,
    password: session.user.password,
    coins: session.user.coins,
  });
  const dataKeys = Object.keys(newData).filter(value=> (value!=="coins"))
  const fieledLabels = {
    firstname: "Prénom",
    lastname: "Nom",
    username: "Pseudo",
    email: "Email",
    password: "Mot de passe"
  }
  console.log(session.user);

  // create function that will fetch using post the api.
  // const user = useContext(RegisterPage);

  console.log("sessiondata", session);
  console.log("newdata", newData);

const renderField = (name) => {
  console.log(name);
  return (<label>
    {fieledLabels[name]}:{""}
    {isEditing ? (
      <input
        name = {name}
        value = {newData[name]}
        onChange= {handleChange}
      ></input>
    ) : (
      <b>{newData[name]}</b>
    )}
    <br></br>
  </label>)
}
const handleChange = (event) => {
  const {name,value} = event.target;
  setNewData(prevState => ({...prevState, [name] : value}));
}

  return (
    <div className="main-content">
      <div className="left-content">
        <div className="edit-profile">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditing(!isEditing);
            }}
          >
            
              <div className="title-form">
                <p>
                  <i>
                    Hey, {session.user.firstname} {session.user.lastname}
                  </i>
                </p>
              </div>
              {
                dataKeys.map(name => renderField(name))
              }
                
            <label>
              Number of coin:{""}
            <b>{session.user.coins}</b>
          <br></br>
        </label>
            <button type="submit" className="form-button">
              {isEditing ? "Save" : "Edit"} Profile
            </button>
          </form>
        </div>
      </div>
      <div className="right-content">
        <div className="purchase-history"></div>
      </div>
    </div>
  );
}

export default ProfilePage;