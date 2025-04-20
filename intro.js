console.log("intro.js")

let opcoesQuiz;

let urlCategoria = "https://tryvia.ptr.red/api_category.php";
let categoriaData;
let selectHtml;


async function carregarCategorias() {

  console.log('url: ', urlCategoria)  
  categoriaData = await fetch(urlCategoria)
                          .then((response) => response.json())
                          .then((jsonBody) => jsonBody.trivia_categories);

  console.log(categoriaData)

  categoriaData.forEach((element) => {
    console.log(`categ: ${element.id} - ${element.name}`)
    let optionHtml = document.createElement('option');
    console.log(`select: ${selectHtml}`)
    optionHtml.value = element.id;
    optionHtml.textContent = element.name;
    selectHtml.appendChild(optionHtml);
  });

  console.log(categoriaData);
}


document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.querySelector("form");
    selectHtml = document.querySelector("#categoria");
  
    carregarCategorias();

    formulario.addEventListener("submit", (event) => {
      event.preventDefault(); // Impede o envio padrão
  
      // Coleta os valores dos campos
      const quantidade = document.getElementById("quantidade").value;
      const dificuldade = document.getElementById("dificuldade").value;
      const tipo = document.getElementById("tipo").value;
      const categoria = document.getElementById("categoria").value;
      const selectElement = document.getElementById('categoria');// Obtém a opção selecionadan
      const selectedOption = selectElement.options[selectElement.selectedIndex];// Pega o texto da opção selecionada
      const nomeCategoria = selectedOption.text;
      console.log('Texto da opção selecionada:', nomeCategoria);

      console.log("Quantas perguntas:", quantidade);
      console.log("Dificuldade:", dificuldade);
      console.log("Tipo de resposta:", tipo);
      console.log("Categoria:", categoria);
  
      opcoesQuiz = {
        quantidade: parseInt(quantidade),
        dificuldade,
        tipo,
        categoria,
        nomeCategoria,
      };
  
      console.log("Dados prontos para envio:", opcoesQuiz);

      localStorage.setItem("configQuiz", JSON.stringify(opcoesQuiz));

      window.location.href = "./quiz.html";
    });
  });