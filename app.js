//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Bem vindo ao jogo do número secreto!';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 a 10'
let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1

function manipulandoTextos(tags, texto){
    let campo = document.querySelector(tags);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}

function exibirMensagemInicial() {
    manipulandoTextos('h1', 'Jogo do número secreto!');
    manipulandoTextos('p', 'Escolha um número entre 1 a 10');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
        if (chute == numeroSecreto){
            manipulandoTextos('h1', 'Parabéns, você Acertou :)');
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa} !`;
            manipulandoTextos('p', mensagemTentativas);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if(chute > numeroSecreto){
                manipulandoTextos('p', `O número secreto é menor que ${chute}`);
            } else {
                manipulandoTextos('p', `O número secreto é maior que ${chute}`);
            }
            tentativas ++;
            limparChute();
        }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let tamanhoDaLista = listaNumerosSorteados.length;
    if(tamanhoDaLista == numeroLimite){
        listaNumerosSorteados = [];
    }
    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparChute() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparChute();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}