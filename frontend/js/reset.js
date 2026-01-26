const token = new URLSearchParams(window.location.search).get("token");

document.getElementById("resetForm").addEventListener("submit",async (e) =>{
    e.preventDefault();
    const password = document.getElementById("password").ariaValueMax;

    const res = await fetch("http://localhost:5000/api/auth/resetPassword",{
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({token,password})
    });
    const data = await res.json();
    alert(data.message);
});