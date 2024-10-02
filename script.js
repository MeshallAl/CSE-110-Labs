window.onload = myfunction;

function myfunction(){
    document.getElementById("subscribeForm").addEventListener("submit", alertSubFunc);

}

function alertSubFunc(){
    const email = document.getElementById("email").value;
    alert(email);
}