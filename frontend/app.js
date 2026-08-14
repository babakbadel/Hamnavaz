const API = window.location.origin;


async function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    const response = await fetch(
        `${API}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );


    const data = await response.json();


    if (data.access_token) {

        localStorage.setItem(
            "token",
            data.access_token
        );

        alert("Login successful");

        window.location.href = "profile.html";

    } else {

        alert(data.detail || "Login failed");

    }

}
async function register() {

    const username =
        document.getElementById("username").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    const response = await fetch(
        `${API}/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        }
    );


    const data = await response.json();


    if (response.ok) {

        alert("Account created");

        window.location.href = "login.html";

    } else {

        alert(data.detail || "Register failed");

    }

}
