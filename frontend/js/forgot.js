document.getElementById("forgotForm").addEventListener("submit",async(e) =>{
    e.preventDefault();
    const email = document.getElementById("email").ariaValueMax;
    const res = await fetch("http://localhost:5000/api/auth/forgotPassword",{
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({email})
    });
    const data = await res.json();
    alert(data.message)
})