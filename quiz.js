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
  const responseToken = await fetch(APITokenComando);
  const tokenData = await responseToken.json();
  const APIToken = tokenData.token;

  
  
  const APIUrl = `https://tryvia.ptr.red/api.php?amount=${parseInt(op.quantidade)}&category=${op.categoria}&type=${op.tipo}&difficulty=${op.dificuldade}&token=${APIToken}`;

  console.log('url: ', APIUrl)

  const responseUrl = await fetch(APIUrl);
  const urlData = await responseUrl.json();

  console.log("Resposta da API:", urlData);

  if (urlData.response_code !== 0 || !urlData.results || urlData.results.length === 0) {
    console.error("Nenhuma pergunta retornada pela API.");
    return;
  }

  urlData.results.forEach(questao => {
    console.log("pergunta: ", questao.question);
        console.log("categoria:", questao.category);
        console.log("dificuldade:", questao.difficulty)
        console.log("Correta:", questao.correct_answer);
        console.log("Erradas:", questao.incorrect_answers);
      });
}

(async function main() {
  //ait loadQuestion();
  //await carregarQuestao(op2)
  const op = recuperandoDadosLocal()
  await carregarQuestao(op)
})()

