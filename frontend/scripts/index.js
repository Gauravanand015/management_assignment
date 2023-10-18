const bySignup = document.getElementById("signUp");

bySignup.addEventListener("submit", (event) => {
  event.preventDefault();
  signUp();
});

const signUp = async () => {
  let obj = {
    email: bySignup.signup_email.value,
    password: bySignup.signup_password.value,
    confirmPassword: bySignup.signup_confirm_password.value,
  };

  let res = await fetch("http://localhost:9090/signup", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  let data = await res.json();

  if (data.Message == "User Registered") {
    alert(data.Message);
  } else if (data === "Email is already in use, try using different email") {
    alert("This email is already in use");
  } else if (data === "Password is not Matching") {
    alert("Password is not Matching");
  } else {
    alert("Something went wrong while signup");
  }
};

const byLogin = document.getElementById("login");

byLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  login();
});

const login = async () => {
  let obj = {
    email: byLogin.login_email.value,
    password: byLogin.login_password.value,
  };

  let res = await fetch("http://localhost:9090/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  let data = await res.json();
  if (data.message == "login successful") {
    localStorage.setItem("token", data.token);
    alert(data.message);
    window.location.href = "dashboard.html";
  } else {
    alert("Something went wrong while signup");
  }
};
