
const dl = document.querySelector(".delete");
const highScoreValue = document.getElementById("highScoreValue");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoreValue.insertAdjacentHTML('beforeend' , highScores
  .map(target => {
    return `<tr><td>${target.name}</td> <td>${target.score}</td></tr>`;
  }).join(""));


  
dele = (e) => {
  e.preventDefault();

const delIndex = prompt("Enter Index no. 1-10");
highScores.shift(highScores[delIndex-1]);
document.getElementsByTagName("tr")[delIndex].remove();
localStorage.setItem('highScores', JSON.stringify(highScores));
console.log(highScores);


}
