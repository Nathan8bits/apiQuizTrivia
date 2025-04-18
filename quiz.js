let listQuestao;
let indexQuestao = 0;
let questoesCorretas = 0;
let opcaoSelecionada;

let opcoesLista = document.querySelectorAll(".opcao");
let btnVerificar = document.querySelector("#btnVerificar");

btnVerificar.addEventListener("click", () => {
  if (indexQuestao < listQuestao.length) {
    console.log("opcao selecionada: ", opcaoSelecionada);
    verificarquestao(opcaoSelecionada);
    indexQuestao++
    mostrarQuestao();
  } else if (opcaoSelecionada != undefined) {

  }
})

//console.log(opcoesLista); // Verifica se os itens li estão sendo selecionados

opcoesLista.forEach((item, index) => {
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
  //correct_answer
  if(listQuestao[indexQuestao].correct_answer == resposta) {
    questoesCorretas++;
    console.log("resposta correta!");
    return true;
  } else {
    console.log("resposta errada!");
    console.log("certo: ", listQuestao[indexQuestao].correct_answer);
    return false;
  }
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

async function carregarQuestao(op) {
  console.log("-------------");
  console.log("carregarQuestao:")

  const APITokenComando = `https://tryvia.ptr.red/api_token.php?command=request`;
  const tokenData = await fetch(APITokenComando)
                              .then((responseToken) => responseToken.json())
                              .then((jsonBodyToken) => jsonBodyToken.token);
  //const tokenData = await responseToken.json();
  //const APIToken = tokenData.token;

  const APIUrl = `https://tryvia.ptr.red/api.php?amount=${op.quantidade}&category=${op.categoria}&type=${op.tipo}&difficulty=${op.dificuldade}&token=${tokenData}`;

  console.log('url: ', APIUrl)

  const urlData = await fetch(APIUrl)
                          .then((response) => response.json())
                          .then((jsonBody) => jsonBody.results);
  //const urlData = await responseUrl.json();
  listQuestao = urlData;
  console.log("lista de questao: ", listQuestao)
  mostrarQuestao();

  /**
   * fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))  //pokemons.map(() => )
        .then((detailRequests) => Promise.all(detailRequests)) //promise.all(todos as requisições são ser retornadas ao mesmo tempo, esperando que todas fiquem prontas)
        .then((pokemonDetails) => pokemonDetails)
   */

  //console.log("Resposta da API:", urlData);

  
}

function mostrarQuestao(){
  if(indexQuestao < listQuestao.length) {
    let pergunta = document.querySelector("#pergunta");
    pergunta.textContent = listQuestao[indexQuestao].question;

    let opcoes = listQuestao[indexQuestao].incorrect_answers;
    opcoes.splice(Math.floor(Math.random() * opcoes.length), 0, listQuestao[indexQuestao].correct_answer);
    
    const textoLi = document.querySelectorAll(".opcao > span")
    textoLi.forEach((item, index) => {

      item.textContent = opcoes[index];
    });

    console.log("pergunta: ", listQuestao[indexQuestao].question);
    console.log("categoria:", listQuestao[indexQuestao].category);
    console.log("dificuldade:", listQuestao[indexQuestao].difficulty)
    console.log("Correta:", listQuestao[indexQuestao].correct_answer);
    console.log("opcoes:", listQuestao[indexQuestao].incorrect_answers);
  
    //indexQuestao++;
  }
}

(async function main() {
  const op = recuperandoDadosLocal()
  //const op = {quantidade: 3, dificuldade: 'easy', tipo: 'multiple', categoria: '0'}
  
  await carregarQuestao(op)
})()

