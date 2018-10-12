// Parse paramaters
var base_grant_url = decodeURIComponent(GetURLParameter("base_grant_url"));
var user_continue_url = decodeURIComponent(GetURLParameter("user_continue_url"));
var node_mac = GetURLParameter("node_mac");
var client_ip = GetURLParameter("client_ip");
var client_mac = GetURLParameter("client_mac");

// Print Meraki provided paramaters for Debugging State
console.log("user_continue_url: "+user_continue_url);
console.log("client_ip: "+client_ip);
document.getElementById("baseGrantURL").innerHTML = base_grant_url;
document.getElementById("userContinueURL").innerHTML = user_continue_url;
document.getElementById("clientIP").innerHTML = client_ip;
document.getElementById("clientMAC").innerHTML = client_mac;
document.getElementById("nodeMAC").innerHTML = node_mac;

// Form Submit handler. 
document.getElementById('loginForm').onsubmit= function(e){
  var config = {
    apiKey: "AIzaSyBZZ5MeNwP_mGa4jD1w5OXGaPbrgNO6R-g",
    authDomain: "invitados-7fe3d.firebaseapp.com",
    databaseURL: "https://invitados-7fe3d.firebaseio.com",
    projectId: "invitados-7fe3d",
    storageBucket: "invitados-7fe3d.appspot.com",
    messagingSenderId: "846946400809"
  };
  firebase.initializeApp(config);
  const dbRef = firebase.database().ref();
  const usersRef = dbRef.child('users');
  
  function arrayJSON(nombre,telefono,correo){
  var data = [nombre,telefono,correo];
  return data;	   
  }
  
  function getID(id){
     return document.getElementById(id).value;
  }
    function insertTask(){
	 var nombre = getID("name");
	 var telefono = getID("company");
	 var correo = getID("email");
	 
	 var arrayData = arrayJSON(nombre,telefono,correo);
	  firebase.database().ref('Usuarios/' + nombre).set({
    correo: correo,
    tel: telefono,
    nombre : nombre
  });
	}

    e.preventDefault(); //prevents default form submission process to allow login and validation
    login();
}

// ******************
// Login to Meraki by redirecting client to the base_grant_url 
// 
// The logingUrl will add a continue_url parameter for a final client
// redirect to their intended site. 
// (you could override this url to send the user to a home page)
// ****************** 
function authUser(){

    var loginUrl = base_grant_url;
    if(user_continue_url !== "undefined"){
        loginUrl += "?continue_url="+user_continue_url;
    }
    console.log("Logging in... ",loginUrl);
    // redirect browser to meraki auth URL.
    window.location.href = loginUrl;
}

// Button handler function to store the form data and login. 
function login(){
    // send the data somewhere like a database
    var data = {};
    data.name = document.getElementById("name").value;
    data.email = document.getElementById("email").value;
    alert("Hola, "+data.name +"\n"+"Ya puedes disfrutar de nuestro servicio!");
    console.log("Storing data to db...", data);

    // Complete Login
    authUser();
}

// Helper function to parse URL
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
