// Inner section element  for Home page:
const sethomeElement = `   <h2>You Can Learn Js</h2>
    <div id="wrap_form"></div>
    <div class=wrap_button>
        <button id="logIn">Log In</button>
        <button id="signUp">Sign Up</button>
    </div>
`
;
// const evenListnercaller= ()=>{
//   document.getElementById("logIn").addEventListener("click",logIn);
//   document.getElementById("signUp").addEventListener("click", signUp);
// }
// Body Elements:
const rootElement = document.getElementById("root");
const HTML = `
        <h1>Welcome To Js</h1>
        <section>  
            ${sethomeElement}   
        </section>
        
`;

// Get elements:
const heading1 = document.querySelector("h1");
const heading2 = document.querySelector("h2");
const button = document.querySelector("button");
const loginButton = document.getElementById("logIn");
const signupButton = document.getElementById("signUp");
const wrapForm = document.getElementById("wrap_form");
const section = document.querySelector("section");

// Inner section element for Login page:
const setloginElement = `   
        <form id="form" novalidate>
          <input id="email" type="email" class="fullwidth_input" name="email" placeholder="Email">
          <p id="errorEmail"></p>
          <input type="password" id="password" class="fullwidth_input" name="pwd" id="pwd" placeholder="Password" >
          <p id="errorPassword"></p>
         <button type="submit" class="submit_button" required>Log In</button>
        <div id="loginlink" class="link">
          <a href="#">Create an account.</a>
        </div>
   </form>
`;

const welcomeHome= (userName)=>{
  document.getElementById("root").innerHTML= `
    <div>
    <h1>Welcome, ${userName}</h1>
    </div>
    <button id="logoutBtn">Log Out</button>
  `
  document.getElementById("logoutBtn").addEventListener("click", logOut);
  

}
const logOut=()=>{
  rootElement.innerHTML= HTML;
  localStorage.removeItem("isAuth");
  // evenListnercaller();

}

let isAuth= localStorage.getItem("isAuth");
if(isAuth){
  welcomeHome();
}
else{
  rootElement.innerHTML = HTML;
  loginButton.addEventListener("click", logIn);
  signupButton.addEventListener("click", signUp);

  // evenListnercaller();
}

// Login Page eventlistner:
const logIn = () => {
  heading1.innerHTML = "Log In";
  heading2.remove();
  loginButton.style.display = "none";
  signupButton.style.display = "none";
  wrapForm.innerHTML = setloginElement;
  document.getElementById("loginlink").addEventListener("click", signUp);
  const form= document.getElementById("form")
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    emailError();
    passwordError();
    const inputs = document.querySelectorAll("input");
    if(emailError()&&passwordError()){
      const usersJson = JSON.parse(localStorage.getItem("users"));
      const email= document.getElementById("email").value;
      const password= document.getElementById("password").value;
      usersJson.forEach(el=>{
        if(el.email===email){
         if(el.password===password){
          welcomeHome(el.email);
            localStorage.setItem("isAuth", true);
         }

        }
      })

    }
    
    const users = usersJson ? usersJson : []; //check if loginform is object or not if not then blank;
    const obj = {};
    inputs.forEach((el) => {
      const name = el.name;
      const value = el.value;
      obj[name] = value;

      // localStorage.setItem("loginForm", JSON.stringify(loginForm));
    }); 
    users.push(obj)
    
    localStorage.setItem("users", JSON.stringify(users))

  })
};


//Inner section element for sign up page:
const setsignupElement = `
    <form id="form"  novalidate>
        <div class="wrap_name">
            <div class="name">
                <input type="text" id="firstname" name= "first_name" placeholder="First name" autofocus required> 
                <p id="errorfirstname"></p>
             </div>
            <div class="name">
                <input type="text" id="lastname" name="last_name" placeholder="Last name" required> 
                <p id="errorlastname"></p>
             </div>
        </div>
            <input id="email" type="email" class="fullwidth_input" name="email" placeholder="Email" required>
            <p id="errorEmail"></p>
            <input id= "password" type="password" name="password" class="fullwidth_input" name="" placeholder="New password" required>
            <p id="errorPassword"></p>
            <input id="confirmPassword" type="password" class="fullwidth_input" placeholder="Confirm password" required>
            <p id="errorConfirm"></p>
        <div class="wrap_gender">
            <div class="female">
                <span>Female</span>
                <input type="radio" name= "gender" value="female">
            </div>
            <div class="male">
                <span>Male</span>
                <input type="radio" name= "gender" value="male" required>
            </div>
            <div class="custom">
                <span>Custom</span>
                <input type="radio" name= "gender" value="custom">
            </div>
        </div>
        <button id="signup_input" type="submit" class="submit_button">Sign Up</button>

        <div id="signuplink" class="link">
        <a href="#" >Already have account.</a>
        </div>
        
    </form>
`;
const nameError = () => {
  const firstName = document.getElementById("firstname");
  const errorfirstName = document.getElementById("errorfirstname");
  const lastName = document.getElementById("lastname");
  const errorlastName = document.getElementById("errorlastname");
  if (!firstName.value.length) {
    errorfirstName.innerHTML = "Fill this field";
    firstName.style.border = "1px solid red";
    firstName.addEventListener("keypress", () => {
      errorfirstName.innerHTML = " ";
      firstName.style.border = "none";
    });
  }
  if (!lastName.value.length) {
    errorlastName.innerHTML = "Fill this field";
    lastName.style.border = "1px solid red";
    lastName.addEventListener("keypress", () => {
      errorlastName.innerHTML = " ";
      lastName.style.border = "none";
    });
  }
};
const emailError = () => {
  const email = document.getElementById("email");
  const errorEmail = document.getElementById("errorEmail");
  if (!email.value.length) {
    errorEmail.innerHTML = "Fill this Field";
  } else if (!email.value.includes("." && "@")) {
    errorEmail.innerHTML = " Email must be in `john@gmail.com` format";
  }
  else{
    return true;
  }
  email.addEventListener("keypress", () => {
    errorEmail.innerHTML = " ";
  });
  
};

const passwordError = () => {
  const password = document.getElementById("password");
  const errorPassword = document.getElementById("errorPassword");
  // const confirmPassword = document.getElementById("confirmPassword");
  // const errorConfirm = document.getElementById("errorConfirm");
  if (!password.value.length) {
    errorPassword.innerHTML = "Fill this field";
  } else if (password.value.length <= 8) {
    errorPassword.innerHTML = `Password must be more than 8 characters`;
  } else if (!password.value.includes("$" || "!" || "*")) {
    errorPassword.innerHTML = `Password must contain any special symbol $,!,*`;
  }
  //  else if (password.value !== confirmPassword.value) {
  //   errorConfirm.innerHTML = " password doesn't match";
  // }
  else{
    return true;
  }
  password.addEventListener("keypress", () => {
    errorPassword.innerHTML = " ";
  });
};

//Sign up page event listener:
const signUp = () => {
  heading1.innerHTML = "Sign Up";
  heading2.remove();
  signupButton.style.display = "none";
  loginButton.style.display = "none";
  wrapForm.innerHTML = setsignupElement;
  //form validation:
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    nameError();
    emailError();
    passwordError();
    //     const firstName= document.getElementById("firstname").value;
    //    localStorage.setItem("firstName", firstName)

    const inputs = document.querySelectorAll("input");
    // data from local storage:
    const usersJson = JSON.parse(localStorage.getItem("users")); //converting string to object
    const users = usersJson ? usersJson : []; //check if loginform is object or not if not then blank;
    const obj = {};
    inputs.forEach((el) => {
      const name = el.name;
      const value = el.value;
      obj[name] = value;

      // localStorage.setItem("loginForm", JSON.stringify(loginForm));
    }); 
    users.push(obj)
    
    localStorage.setItem("users", JSON.stringify(users))
  });


   //eventlistner for login to render the page:
   document.getElementById("signuplink").addEventListener("click", logIn);

   const email = document.getElementById("email");
   localStorage.setItem("email", email);

   const inputs = document.querySelectorAll("input");
   // data from local storage:
   const getloginForm = JSON.parse(localStorage.getItem("loginForm")); //converting string to object
   const loginForm = getloginForm ? getloginForm : {}; //check if loginform is object or not if not then blank;
   console.log(loginForm);

   inputs.forEach((el) =>
     el.addEventListener("keyup", (e) => {
       const name = e.target.name;
       const value = e.target.value;
       loginForm[name] = value;
       localStorage.setItem("loginForm", JSON.stringify(loginForm));
     })
   );
   inputs.forEach((input) => {
     input.value = loginForm[input.name] ? loginForm[input.name] : "";
   });
};


