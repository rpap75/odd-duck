'use strict';

// #pragma Globals


// let leftImg = document.getElementById('img-one');
// let midImg = document.getElementById('img-two');
// let rightImg = document.getElementById('img-three');


let voteCount = 5;

let productArray = [];

// #pragma DOM References

let imageContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');

// #pragma Helper/Utility Functions

function randomProduct() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImages() {
  let imgOneRandom = randomProduct();
  let imgTwoRandom = randomProduct();
  let imgThreeRandom = randomProduct();

  while (imgOneRandom === imgTwoRandom || imgTwoRandom === imgThreeRandom || imgOneRandom === imgThreeRandom) {
    imgOneRandom = randomProduct();
    imgTwoRandom = randomProduct();
    imgThreeRandom = randomProduct();
  }

  imgOne.src = productArray[imgOneRandom].imagePath;
  imgTwo.src = productArray[imgTwoRandom].imagePath;
  imgThree.src = productArray[imgThreeRandom].imagePath;

  imgOne.alt = productArray[imgOneRandom].name;
  imgTwo.alt = productArray[imgTwoRandom].name;
  imgThree.alt = productArray[imgThreeRandom].name;

  productArray[imgOneRandom].views++;
  productArray[imgTwoRandom].views++;
  productArray[imgThreeRandom].views++;
}

// #pragma Event Handlers

function handleShowResults(event) {
  if (voteCount === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].name} was viewed: ${productArray[i].views} time(s) and clicked: ${productArray[i].clicks}`;
      resultsContainer.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

function handleImageClick(event) {

  let productClicked = event.target.alt;

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].name === productClicked) {
      productArray[i].clicks++;
    }
  }

  voteCount--;

  renderImages();

  if (voteCount === 0) {
    imgOne.removeEventListener('click', handleImageClick);
    imgTwo.removeEventListener('click', handleImageClick);
    imgThree.removeEventListener('click', handleImageClick);
  }
}

// #pragma Constructor

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.imagePath = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
}

// #pragma Executable

let sweep = new Product('sweep', 'png');
let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblebum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dog = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let pet = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let water = new Product('water-can');
let wine = new Product('wine-glass');


productArray.push(sweep, bag, banana, bathroom, boots, breakfast, bubblebum, chair, cthulhu, dog, dragon, pen, pet, scissors, shark, tauntaun, unicorn, water, wine);

renderImages();

imgOne.addEventListener('click', handleImageClick);
imgTwo.addEventListener('click', handleImageClick);
imgThree.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', handleShowResults);