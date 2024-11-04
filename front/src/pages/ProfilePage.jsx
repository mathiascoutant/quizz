import { useContext, useState } from "react";
import RegisterPage from "./RegisterPage";
function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("idryss");
  const [lastName, setLastName] = useState("judéaux");
  const [mail, setMail] = useState("idryss@ynov.com");
  const [pseudo, setPseudo] = useState("Black Jesus");
  const [password, setPassword] = useState("mdp012345");

  const user = useContext(RegisterPage);
 

  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
        
      }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsEditing(!isEditing);
        }}
      >
        <label>
          First name:{""}
          {isEditing ? (
            <input
              value={user.firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></input>
          ) : (
            <b>{firstName}</b>
          )}<br></br>
        </label>
        <label>
          Last name:{""}
          {isEditing ? (
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></input>
          ) : (
            <b>{lastName}</b>
          )}<br></br>
        </label>
        <label>
          Mail:{""}
          {isEditing ? (
            <input
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
              }}
            ></input>
          ) : (
            <b>{mail}</b>
          )}<br></br>
        </label>
        <label>
          Password:{""}
          {isEditing ? (
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          ) : (
            <b>{password}</b>
          )}<br></br>
        </label>
        <label>
          Pseudo:{""}
          {isEditing ? (
            <input
              value={pseudo}
              onChange={(e) => {
                setPseudo(e.target.value);
              }}
            ></input>
          ) : (
            <b>{pseudo}</b>
          )}<br></br>
        </label>
        <button type="submit">{isEditing ? "Save" : "Edit"} Profile</button>
        <p>
          <i>
            Hey, {firstName} {lastName}
          </i>
        </p>
      </form>
    </div>
  );
}

export default ProfilePage;
