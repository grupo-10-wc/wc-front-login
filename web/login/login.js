const usuario = "admin";
const senha = "admin";
const error = document.querySelector(".error");

function entrar(event) {
    event.preventDefault();
    estilizaBotao();
    
    var user_ipt = document.querySelector("#email");
    var password_ipt = document.querySelector("#senha");

    if(user_ipt.value === usuario && password_ipt.value === senha) {
        window.location.href = "./../auth/auth.html";
    }
    else {
        password_ipt.value = "";
        error.style.display = "flex";
        estilizaBotao();
    }
    
}

function estilizaBotao() {
    const textoInicial = "Entrar"
    const textoEntrando = "Entrando...";
    const btn = document.querySelector(".login-btn");

    if(btn.innerText === textoInicial){
        btn.innerText = textoEntrando;
    } else {
        btn.innerText = textoInicial;
    }
}

function fecharAlerta() {
    error.style.display = "none";
}