const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function userFormSubmit() {
  var username = document.getElementById("username-signup").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password-signup").value;

  if (username == "") {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Username is required!",
    });
    return false;
  }
  if (email == "") {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Email is required!",
    });
    return false;
  }
  if (password == "") {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Password is required!",
    });
    return false;
  } else {
    var user = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });

    fetch("https://e-commerce-sh.herokuapp.com/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: user,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
        if (data.statusCode == 201) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "User Registered Successfully!",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          })
          // remove Animation
          .then((result) => {
            if (result.isConfirmed) {
              container.classList.remove("sign-up-mode");
            }
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error,
        });
        console.error("Error:", error);
      });

    console.log("User: ", user);
  }
}

function userLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username == "") {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Username is required!",
    });
    return false;
  }
  if (password == "") {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Password is required!",
    });
    return false;
  } else {
    var user = JSON.stringify({
      username: username,
      password: password,
    });

    fetch("https://e-commerce-sh.herokuapp.com/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: user,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login Data:", data);
        if (data.statusCode == 200) {
          window.location.href = "/Full-Stack-E-commerce/home/home.html";
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error,
        });
        console.error("Error:", error);
      });

    console.log("User: ", user);
  }
}
