console.log("intro.js")

let opcoesQuiz;

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");
  
    formulario.addEventListener("submit", (event) => {
      event.preventDefault(); // Impede o envio padrão
  
      // Coleta os valores dos campos
      const quantidade = document.getElementById("quantidade").value;
      const dificuldade = document.getElementById("dificuldade").value;
      const tipo = document.getElementById("tipo").value;
      const categoria = document.getElementById("categoria").value;
  
      // Exibe os dados no console (ou use para montar uma requisição)
      console.log("Quantas perguntas:", quantidade);
      console.log("Dificuldade:", dificuldade);
      console.log("Tipo de resposta:", tipo);
      console.log("Categoria:", categoria);
  
      // Aqui você pode enviar os dados para uma API, ou usar para outra lógica
      // Exemplo fictício:
      opcoesQuiz = {
        quantidade: parseInt(quantidade),
        dificuldade,
        tipo,
        categoria
      };
  
      // Você pode substituir esse log por uma chamada fetch ou outro processamento
      console.log("Dados prontos para envio:", opcoesQuiz);

      localStorage.setItem("configQuiz", JSON.stringify(opcoesQuiz));

      window.location.href = "quiz.html";
    });
  });
  

