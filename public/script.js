function addToCart(productName){
    let cart=JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(productName);
    localStorage.setItem("cart",JSON.stringify(cart));
    let countElement=document.getElementById("card-count");
  if(countElement){
    countElement.innerText=cart.length;
  }
  alert(productName+"added to cart!");
}

async function registerUser(){
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  const response=await fetch("/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,
      email,
      password
    })

  });
  const data=await response.json();
  alert(data.message);
}

async function loginUser() {
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  const response=await fetch("/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      email,
      password
    })
  });
  const data=await response.json();
  if(data.message==="Login Successful!"){
    localStorage.setItem("loggedIn","true");
    alert(data.message);
    window.location.href="index.html";
  }else{
    alert(data.message);
  }
}

function logout(){
  localStorage.removeItem("loggedIn");
  alert("Logged Out Successfully!!");
  window.location.href="login.html";
}