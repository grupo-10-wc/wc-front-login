const EMAILJS_PUBLIC_KEY = window.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = window.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = window.env.EMAILJS_TEMPLATE_ID;

function autenticar(event) {
    event.preventDefault();
    const input = document.getElementById('auth').value;
    const otp = sessionStorage.getItem('otp');
    const expiracao = sessionStorage.getItem('otp_expiracao');

    const agora = new Date();
    const [data, hora] = expiracao.split(' ');
    const [ano, mes, dia] = data.split('-');
    const [h, m] = hora.split(':');
    const expiracaoDate = new Date(ano, mes - 1, dia, h, m);

    if (!otp || agora > expiracaoDate) {
        document.querySelector('.error').style.display = 'flex';
        return;
    }

    if (input === otp) {
        alert('Autenticado com sucesso!');
        window.location.href = "https://docs.google.com/spreadsheets/d/1RCEqEx8ryDoGd82Wm_-ljPLs8MPucLSM3BL4FWjBPUc/edit?pli=1&gid=1068434589#gid=1068434589";
    } else {
        document.querySelector('.error').style.display = 'flex';
        document.querySelector('.error span').textContent = 'Código inválido.';
    }
}

function enviarNovoOTP() {
    const email = sessionStorage.getItem('email');
    if (!email) {
        alert('E-mail não encontrado. Faça login novamente.');
        window.location.href = '/login/login.html';
        return;
    }

    const otp = gerarOTP();
    const expiracao = horarioExpiracao();

    salvarOTP(otp, expiracao);

    emailjs.send(window.env.EMAILJS_SERVICE_ID, window.env.EMAILJS_TEMPLATE_ID, {
        to_email: email,
        passcode: otp,
        time: expiracao
    }, window.env.EMAILJS_PUBLIC_KEY)
    .then(() => {
        alert('Novo código enviado para seu e-mail!');
    })
    .catch((err) => {
        alert('Erro ao reenviar código: ' + err.text);
    });
}

function salvarOTP(otp, expiracao) {
    sessionStorage.setItem('otp', otp);
    sessionStorage.setItem('otp_expiracao', expiracao);
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

function fecharAlerta() {
    document.querySelector(".error").style.display = "none";
}