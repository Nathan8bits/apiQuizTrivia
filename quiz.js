let listQuestao;
let indexQuestao = 0;
let questoesCorretas = 0;
let opcaoSelecionada = undefined;
let tokenData;
const op = recuperandoDadosLocal();

let categoriaHtml = document.querySelector("#dificuldade");
let respostasCorretasHtml = document.querySelector("#respostasCorretas");
let respostasTotaisHtml = document.querySelector("#respostasTotais");
let opcoesListaHtml = document.querySelectorAll(".opcao");
let btnVerificar = document.querySelector("#btnVerificar");
const btnReiniciar = document.querySelector("#btnReiniciar");
const btnNovoQuiz = document.querySelector("#btnNovoQuiz");

btnNovoQuiz.addEventListener("click", () => {
  console.log("btn NOvo Quiz")
  window.location.href = "./intro.html";
})

btnReiniciar.addEventListener("click", () => { reiniciar()});

btnVerificar.addEventListener("click", () => {
  console.log("clicou btnVerificar");
  console.log(`${indexQuestao}, ${listQuestao.length}`);
  if (indexQuestao < listQuestao.length && opcaoSelecionada !== undefined) {
    verificarquestao(opcaoSelecionada);

    if (indexQuestao >= listQuestao.length) {
      btnVerificar.disabled = true;
      btnReiniciar.style.display = "block";
      btnNovoQuiz.style.display = "block";
      document.querySelector("#feedback").style.marginBottom = "20px";

      const selected = document.querySelector('.selected');
      if(selected) selected.classList.remove('selected');
    } else {
      setTimeout(() => {
        mostrarQuestao();
      }, 1000);
    }
  } else if (opcaoSelecionada == undefined) {
    console.log("selecione uma opcao");
    document.querySelector('#feedback').textContent = "selecione uma opção!";
    document.querySelector("#feedback").style.color = "red";
  }
})

opcoesListaHtml.forEach((item, index) => {
  item.addEventListener("click", () => {
    if(document.querySelector('.selected') === null) {
      console.log('nao ha selected') ; 
      item.classList.add('selected');
    } else {
      document.querySelector('.selected').classList.remove('selected');
      item.classList.add('selected')
    }

    const texto = item.querySelector("span").textContent.trim(); // Pega o texto dentro do <span>
    console.log(`Você clicou na opção ${index + 1}: ${texto}`);
    opcaoSelecionada = texto;
  });
});


function verificarquestao(resposta) {
  let feedBack= document.querySelector("#feedback")
  if(listQuestao[indexQuestao].correct_answer == resposta) {
    questoesCorretas++;
    respostasCorretasHtml.textContent = questoesCorretas;
    console.log("respostas corretas: ", questoesCorretas);
    feedBack.textContent = "resposta correta!";
  } else {
    feedBack.textContent = "resposta errada!";
    feedBack.innerHTML += `<br><span>correta: ${listQuestao[indexQuestao].correct_answer}</span>`
    console.log("resposta errada!");
    console.log("certo: ", listQuestao[indexQuestao].correct_answer);
  }

  indexQuestao++;
}

async function reiniciar() {
  console.log("Reiniciando quiz...");
  
  indexQuestao = 0;
  questoesCorretas = 0;
  opcaoSelecionada = undefined;
  
  respostasCorretasHtml.textContent = "0";
  document.querySelector("#feedback").textContent = "";
  
  btnReiniciar.style.display = "none";
  btnNovoQuiz.style.display = "none";
  //btnVerificar.disabled = false;
  
  await carregarQuestao();
}

function recuperandoDadosLocal() {
    const opcoesQuiz = JSON.parse(localStorage.getItem("configQuiz"));

    if (opcoesQuiz) {
      console.log("Objeto recuperado:", opcoesQuiz);
      // Pode usar os dados normalmente
    } else {
      console.log("Nenhum dado encontrado no localStorage.");
    }

  return opcoesQuiz;
}

async function gerarToken() {
  const APITokenComando = `https://tryvia.ptr.red/api_token.php?command=request`;
  tokenData = await fetch(APITokenComando)
                              .then((responseToken) => responseToken.json())
                              .then((jsonBodyToken) => jsonBodyToken.token);

}

async function carregarQuestao() {
  console.log("-------------");
  console.log("carregarQuestao:")

  
  const APIUrl = `https://tryvia.ptr.red/api.php?amount=${op.quantidade}&category=${op.categoria}&type=${op.tipo}&difficulty=${op.dificuldade}&token=${tokenData}`;

  console.log('url: ', APIUrl)

  const urlData = await fetch(APIUrl)
                          .then((response) => response.json())
                          .then((jsonBody) => jsonBody.results);
  
  listQuestao = urlData;
  if(listQuestao.length == 0) {
    console.log("sem resultados");
    window.location.href = "intro.html";
    alert("Sem resultados")
  }
  console.log("lista de questao: ", listQuestao)
  mostrarQuestao();  
}

function mostrarQuestao(){
  opcaoSelecionada = undefined;
  document.querySelector("#feedback").textContent = "";
  
  if(indexQuestao === 0) {
    respostasCorretasHtml.textContent = "0";
    respostasTotaisHtml.textContent = listQuestao.length;
    categoriaHtml.textContent = op.nomeCategoria;
    document.querySelector("#categoria").textContent = listQuestao[indexQuestao].category;
  } else if(document.querySelector('.selected')) {
    document.querySelector('.selected').classList.remove("selected");
  }
  
  if(indexQuestao < listQuestao.length) {
    document.querySelector("#pergunta").textContent = listQuestao[indexQuestao].question;
    document.querySelector("#dificuldade").textContent = listQuestao[indexQuestao].difficulty;
    
    let opcoes = [...listQuestao[indexQuestao].incorrect_answers];
    opcoes.splice(Math.floor(Math.random() * (opcoes.length + 1)), 0, 
                 listQuestao[indexQuestao].correct_answer);
    
    document.querySelectorAll(".opcao span").forEach((item, index) => {
      item.textContent = opcoes[index];
    });
  }
}

(async function main() {
  //const op = recuperandoDadosLocal()
  //const op = {quantidade: 3, dificuldade: 'easy', tipo: 'multiple', categoria: '0'}
  await gerarToken();
  await carregarQuestao()
})();