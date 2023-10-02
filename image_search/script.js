const access_key = "Your access key";//you have to put your access key here as I have mentioned how to get the key in README.md file
const formElement = document.getElementById("search-form");
const inputElement = document.getElementById("search-input");
const searchResult = document.getElementById("search-results");
const showmorebutton = document.getElementById("show-more-button");
//console.log(formElement);
// console.log(inputElement);
// console.log(searchResults);
// console.log(showmorebutton);
let inputdata = "";
let page = 1;

async function search_images()
{
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add("search-result");
  inputdata = inputElement.value;
  const encodedInputdata = encodeURIComponent(inputdata);
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${access_key}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  //console.log(data);
  const results = data.results;
  results.map((result) =>{
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResult.appendChild(imageWrapper);
  });
  page++;
  if(page > 1)
  {
    showmorebutton.style.display="block";
  }
}
formElement.addEventListener("submit", (e) =>{
  e.preventDefault();
  page = 1;
  search_images();
})
showmorebutton.addEventListener("click", (e) =>{
  search_images();
});
