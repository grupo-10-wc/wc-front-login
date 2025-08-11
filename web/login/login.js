const EMAIL = window.env.EMAIL;
const SENHA = window.env.SENHA;
const EMAILJS_PUBLIC_KEY = window.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = window.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = window.env.EMAILJS_TEMPLATE_ID;

emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
});

function entrar(event) {
    event.preventDefault();
    
    var email = document.querySelector("#email").value;
    var senha = document.querySelector("#senha").value;

    if(email === EMAIL && senha === SENHA) {
        estilizaBotao();
        enviarOTP(email);
        window.location.href = "/auth/auth.html";
    }
    else {
        senha = "";
        document.querySelector(".error").style.display = "flex";
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
    document.querySelector(".error").style.display = "none";
}

function gerarOTP(length = 6) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}

function horarioExpiracao(minutos = 15) {
    const agora = new Date();
    agora.setMinutes(agora.getMinutes() + minutos);

    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');

    return `${ano}-${mes}-${dia} ${hora}:${minuto}`;
}

function enviarOTP(email) {
    const otp = gerarOTP();
    const expiracao = horarioExpiracao();

    salvarOTP(otp, expiracao, email);

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: email,
        passcode: otp,
        time: expiracao
    }, window.env.EMAILJS_PUBLIC_KEY)
    .catch((err) => {
        alert("Erro ao enviar código: " + err.text);
        estilizaBotao();
    });
}

function salvarOTP(otp, expiracao, email) {
    sessionStorage.setItem('otp', otp);
    sessionStorage.setItem('otp_expiracao', expiracao);
    sessionStorage.setItem('email', email);
}