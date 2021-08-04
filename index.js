const inputBar = document.getElementById("inputBar");
const search = document.getElementById("search");
let output = document.getElementById('output');
const dot =`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
<path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
</svg>`;

search.addEventListener("click", () => {
  let text = inputBar.value;
//   text = text.toUpperCase();
  let flag =1;
  output.innerHTML =`<h2>${text}</h2><hr>`;

  // console.log(text);
  async function meaning() {
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${text}`
    );
    let values = await response.json();
    console.log(values);
    if(values.title != "No Definitions Found"){
    values.forEach((element) => {
    //   console.log(element.meanings);
      element.meanings.forEach((element) => {
        output.innerHTML +=`<h3 class='pos'>${flag}. ${element.partOfSpeech}:</h3>`;
        flag = flag+1;
        let flagDef =1;
        element.definitions.forEach(element => {
            console.log(element.definition);
            output.innerHTML +=`<p class='def'>${dot} ${element.definition}</p>`;
            flagDef = flagDef+1;
        })
      });
    });
}
else{
    output.innerHTML +=`<h3 class='pos'>${values.title}:</h3>`;
    output.innerHTML +=`<p class='def'>${values.message} ${values.resolution}</p>`;
}
    return values;
  }
  let a = meaning();
  inputBar.value ="";
});
