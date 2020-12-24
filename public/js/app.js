console.log("Client side javascript file is loaded!");


const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const msg1 =document.querySelector('#msg1');
const msg2 =document.querySelector('#msg2');
 
weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  msg1.textContent = 'Loading.....'
  fetch("http://localhost:3000/weather?search="+location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        msg1.textContent = data.error
      } else {
        console.log(data.location);
        msg1.textContent = data.location

        console.log(data.type);
      }
    });
  });
  
});
