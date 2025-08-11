const EMAIL = window.env.EMAIL;
const SENHA = window.env.SENHA;
const EMAILJS_PUBLIC_KEY = window.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = window.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = window.env.EMAILJS_TEMPLATE_ID;
const FORM = document.querySelector(".login-body");
const ERROR = document.querySelector(".error");

function entrar(event) {
    event.preventDefault();
    estilizaBotao();
    
    var email_ipt = document.querySelector("#email");
    var password_ipt = document.querySelector("#senha");

    if(email_ipt.value === EMAIL && password_ipt.value === SENHA) {
        enviarOTP(email_ipt.value);
        window.location.href = "/auth/auth.html";
    }
    else {
        password_ipt.value = "";
        ERROR.style.display = "flex";
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
    ERROR.style.display = "none";
}

function gerarOTP(length = 6) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}

function horarioExpiracao(minutos = 15) {
    const agora = new Date();
    agora.setMinutes(agora.getMinutes() + minutos);
    return agora.toISOString().replace('T', ' ').substring(0, 16);
}

function enviarOTP(email) {
    const otp = gerarOTP();
    const expires = horarioExpiracao();

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,
    });

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: email,
        passcode: otp,
        time: expires
    }, window.env.EMAILJS_PUBLIC_KEY)
    .then(() => {
        alert("Código enviado!");
    })
    .catch((err) => {
        alert("Erro ao enviar código: " + err.text);
    });
}