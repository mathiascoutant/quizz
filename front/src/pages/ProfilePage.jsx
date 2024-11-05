import { useContext, useEffect, useState } from "react";
import RegisterPage from "./RegisterPage";
import { useSessionStore } from "../store/session.store";
function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  /*onst [firstName, setFirstName] = useState("idryss");
  const [lastName, setLastName] = useState("judéaux");
  const [mail, setMail] = useState("idryss@ynov.com");
  const [pseudo, setPseudo] = useState("Black Jesus");
  const [password, setPassword] = useState("mdp012345");*/
  
  const session = useSessionStore((state) => state.session);
  const [newData, setNewData] = useState({
    firstname: session.user.firstname,
    lastname: session.user.lastname,
    username: session.user.pseudo,
    mail: session.user.mail,
    password: session.user.password,
    coin: session.user.coin,
  })

  //console.log(session.user)

  // create function that will fetch using post the api.

  // const user = useContext(RegisterPage);
  
  console.log("sessiondata", session)
  console.log("newdata", newData)
 

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
              value={session.user.firstname}
              onChange={(e) => {
                setNewData((prevState) => {
                  return {
                    ...prevState,
                    firstname: e.target.value,
                  }
                })
              }}
            ></input>
          ) : (
            <b>{session.user.firstname}</b>
          )}<br></br>
        </label>
        <label>
          Last name:{""}
          {isEditing ? (
            <input
              value={session.user.lastname}
              onChange={(e) => {
                setNewData((prevState) => {
                  return {
                    ...prevState,
                    lastName: e.target.value,
                  }
                })
              }}
            ></input>
          ) : (
            <b>{session.user.lastname}</b>
          )}<br></br>
        </label>
        <label>
          Mail:{""}
          {isEditing ? (
            <input
              value={session.user.mail}
              onChange={(e) => {
                setNewData((prevState) => {
                  return {
                    ...prevState,
                    mail: e.target.value,
                  }
                })
              }}
            ></input>
          ) : (
            <b>{session.user.mail}</b>
          )}<br></br>
        </label>
        <label>
          Password:{""}
          {isEditing ? (
            <input
              value={session.user.password}
              onChange={(e) => {
                setNewData((prevState) => {
                  return {
                    ...prevState,
                    password: e.target.value,
                  }
                })
              }}
            ></input>
          ) : (
            <b>{session.user.password}</b>
          )}<br></br>
        </label>
        <label>
          Username:{""}
          {isEditing ? (
            <input
              value={session.user.pseudo}
              onChange={(e) => {
                setNewData(e.target.value);
              }}
            ></input>
          ) : (
            <b>{session.user.pseudo}</b>
          )}<br></br>
        </label>
        <label>
          Number of coin:{""}
            <b>{session.user.coin}</b>
          <br>{session.user.coin}</br>
        </label>
        <button type="submit">{isEditing ? "Save" : "Edit"} Profile</button>
        <p>
          <i>
            Hey, {session.user.firstname} {session.user.lastname}
          </i>
        </p>
      </form>
    </div>
  );
}

export default ProfilePage;
