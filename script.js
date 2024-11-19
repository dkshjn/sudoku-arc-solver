@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;1,400&display=swap');
*{
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    box-sizing: border-box;
}
html{
    scroll-behavior: smooth;
    overflow-x: hidden;
}
body{
    background: rgb(217, 232,200);
    position: relative;
    overflow-x: hidden;
}
#header{
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
}
.logo{
    font-family: 'Pacifico';
    text-align: left;
    font-size: 40px;
    color: #20a39e;
}
.container a{
    text-decoration: none;
}
.container{
    padding: 10px 10%;
}
nav{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
nav ul li{
    display: inline-block;
    list-style: none;
    margin: 10px 20px;
    
}
nav ul li a{
    color: #20a39e;
    text-decoration: none;
    font-size: 19px;
    font-family: 'Montserrat',sans-serif;
    transition: .25s ease;
}
nav ul li:hover a:hover {
    color: #ffba49;
    box-shadow: 0 2px 0 0 currentcolor;
  }
nav .fa-solid{
    display: none;
}
.header-text{
    margin-top: 20%;
    font-size: 20px;
  }
.header-text h1{
    font-size: 60px;
    margin-top: 20px;
    font-family: "Montserrat",sans-serif;
}
.header-text h1 span{
    color:#20a39e;
    font-family: "Montserrat",sans-serif; 
}
#sub-head{
    text-align: center;
    font-size: 35px;
    padding: 10px 5%;
    margin: 10px;
}
.text{
    font-family:'Montserrat';
    color: black;
}
.row{
    margin-top: 5%;
    margin-left: 2%;
    margin-right: 2%;
    display: flex;
    justify-content: space-between;
}
.proj{
    flex-basis: 31%;
    background: white;
    border-radius: 10px;
    margin-bottom: 5%;
    box-sizing: border-box;
    transition: 0.5s;
    position: relative;
}
.proj:hover{
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.2);
}
.proj h3{
    font-size: 30px;
    text-align: center;
    margin: 10px 0;
    font-family:'Montserrat';
}
.proj p{
    margin: 10px 10px;
    font-size: 20px;
    font-family:'Montserrat';
}
.proj img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}

.proj .image-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 75%;
}

.proj .image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.proj a{
    color: #20a39e;
    text-decoration: none;
    font-size: 24px;
    font-family: 'Montserrat',sans-serif;
    transition: .25s ease;
    text-align: center;
}
.proj a:hover {
    color: #ffba49;
    box-shadow: 0 2px 0 0 currentcolor;
  }

#copyright{
    width: 100%;
    text-align: center;
    padding: 20px 0;
    background-color: rgb(217, 232,200);
    margin-top: 20px;
    bottom: 0;
    left: 0;
    z-index: 999;
}
/*-----------changes for mobile devices----------*/
@media(max-width: 700px){
    .header-text{
        margin-top: 40%;
    }
    .header-text h1{
        font-size: 30px;
        margin-top: 50px;
    }
    #header{
        width: 100%;
        height: 100vh;
        background-image: url(edit.jpg);
        background-size: cover;
        background-position: 500px 0px;
    }
    nav ul li a{
        color: rgb(217, 232,200);
    }
    nav ul li{
        display: block; 
    }
    .nav-links {
        position: absolute;
        background: #20a39e;
        height: 100vh;
        width: 200px;
        top: 0;
        right: -200px;
        text-align: left;
        z-index: 2;
        transition: 1s;
    }
    nav .fa-solid{
        display: block;
        color: #20a39e;
        margin: 20px;
        font-size: 25px;
        cursor: pointer;
    }
    nav .fa-xmark{
        color: rgb(217, 232,200);
    }
    nav .fa-bars{
        color: #20a39e;   
    }
    .row{
        flex-direction: column;
    }
    #sub-head{
        text-align: center;
        font-size: 25px;
        padding: 10px 5%;
        margin: 10px;
    }
    .proj h3{
        font-size: 24px;
        text-align: center;
        margin: 10px 0;
        font-family:'Montserrat';
    }
    .proj p{
        margin: 10px 10px;
        font-size: 15px;
        font-family:'Montserrat';
    }
    #copyright{
        padding: 10px 0;
        margin-top: 10px;
    }
}
