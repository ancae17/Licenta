import React from "react";
import "./MainPage.css";
import NavBar from "./NavBar";

function MainPage() {
  return (
    <div>
      <NavBar />
      <div className="container-main">
        <div className="image-container-main"> 
          <img
            src={require("../Images/mainPage.jpeg")}
            alt=""
            className="image-main"
          />
          <div className="overlay">
            <div className="text-container-main">
              <div className="text-main">
              Din pasiunea mea pentru artă și dragostea pentru lucrurile făcute manual, mă dedic creării acestor produse 
              personalizabile și unice. Fiecare obiect pe care îl realizez este conceput cu atenție și grijă, având în minte dorința 
              de a aduce bucurie și valoare în viața celor care le vor cumpăra sau primi.
                <br></br>
                <br></br>
              Folosindu-mă de diferite tehnici și abordări artistice, pun în practică idei și concepte pentru a crea produse care 
              să exprime originalitate și autenticitate. 
                <br></br>
                <br></br>
              Prin intermediul acestor produse, îmi propun să aduc un strop de frumusețe și inspirație în viața celor care le apreciază.
                <br></br>
                <br></br>
              Orice produs de pe acest site poate fi personalizabil și realizat după preferințele clientului.
                <br></br>
                <br></br>
                Contact: 0725482700
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
