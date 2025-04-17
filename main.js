async function loadQuestion() {
    const APITokenComando = `https://tryvia.ptr.red/api_token.php?command=request`;
    const responseToken = await fetch(APITokenComando);
    const tokenData = await responseToken.json(); // Agora você extrai o token da resposta
    const APIToken = tokenData.token; // Supondo que o token esteja na propriedade "token"

    const APIUrl = `https://tryvia.ptr.red/api.php?amount=1&category=0&type=multiple&difficulty=easy&token=${APIToken}`;

    const responseUrl = await fetch(APIUrl);
    const urlData = await responseUrl.json();

    console.log(urlData);
    console.log(urlData.results[0].category);
    console.log(urlData.results[0].question);
    console.log("v",urlData.results[0].correct_answer
    );
    console.log(urlData.results[0].incorrect_answers[0]);
    console.log(urlData.results[0].incorrect_answers[1]);
    console.log(urlData.results[0].incorrect_answers[2]);
}

console.log("hello");
loadQuestion();
loadQuestion();
