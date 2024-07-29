import React from 'react';

function logOut(){
  localStorage.clear();
  window.location.reload();
}

function Home() {
  return (
    <div>
      <h1>Welcome {localStorage.getItem("Name")}</h1>
      <h3>Account Information:</h3>
      <p><b>Name: </b>{localStorage.getItem("Name")}</p>
      <p><b>Email: </b>{localStorage.getItem("Email")}</p>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Home;
