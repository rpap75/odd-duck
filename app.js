'use strict';

// #pragma Globals

let voteCount = 25;
let productArray = [];
let previousArray = [];
let reinstatedProducts = [];

// #pragma DOM References

let imageContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');

let chartContext = document.getElementById('my-chart').getContext('2d');

// #pragma Helper/Utility Functions

function randomProduct() {
  return Math.floor(Math.random() * productArray.length);
}

function uniqueImgChk() {
  let currentArray = [];

  while (currentArray.length < 3) {
    let randomIndex = randomProduct();

    if (currentArray.includes(randomIndex) || previousArray.includes(randomIndex)) {
      //do nothing
    }
    else {
      currentArray.push(randomIndex);
    }
  }
  previousArray = currentArray;

  return (currentArray);
}

function renderImages() {
  let imageChecker = uniqueImgChk();
  let imgOneRandom = productArray[imageChecker[0]];
  let imgTwoRandom = productArray[imageChecker[1]];
  let imgThreeRandom = productArray[imageChecker[2]];

  imgOne.src = imgOneRandom.imagePath;
  imgTwo.src = imgTwoRandom.imagePath;
  imgThree.src = imgThreeRandom.imagePath;

  imgOne.alt = imgOneRandom.name;
  imgTwo.alt = imgTwoRandom.name;
  imgThree.alt = imgThreeRandom.name;

  imgOneRandom.views++;
  imgTwoRandom.views++;
  imgThreeRandom.views++;
}

// #pragma Event Handlers

function handleShowResults(event) {
  if (voteCount === 0) {
    let productNames = [];
    let productViews = [];
    let productClicks = [];

    for (let i = 0; i < productArray.length; i++) {
      productNames.push(productArray[i].name);
      productViews.push(productArray[i].views);
      productClicks.push(productArray[i].clicks);
    }

    let chartConfig = {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [{
          label: '# of Views',
          data: productViews,
          backgroundColor: 'red',
        }, {
          label: '# of Clicks',
          data: productClicks,
        }],
      },
      options: {},
    };

    let myChart = new Chart(chartContext, chartConfig);
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}
function handleImageClick(event) {

  let productClicked = event.target.alt;

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].name === productClicked) {
      productArray[i].clicks++;
      voteCount--;
      renderImages();
    }
  }

  if (voteCount === 0) {
    imageContainer.removeEventListener('click', handleImageClick);

    let stringifiedProducts = JSON.stringify(productArray);

    localStorage.setItem('myProducts', stringifiedProducts);
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
let retrievedProducts = localStorage.getItem('myProducts');

let parsedProducts = JSON.parse(retrievedProducts);

if (parsedProducts) {
  productArray = parsedProducts;

  for (let i = 0; i < parsedProducts.length; i++) {
    let newProduct = new Product(parsedProducts[i].name);
    newProduct.clicks = parsedProducts[i].clicks;
    newProduct.views = parsedProducts[i].views;
    reinstatedProducts.push(newProduct);
  }

} else {
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

}
console.log('productArray after construction >>>>> ', productArray);

renderImages();

imageContainer.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', handleShowResults);


