//Counts the number of cards in ordered items
let n = 1;
//For total price of ordered items
let price = 0;
//Arrays for drink size and product prices
const prodSize = ["S", "M", "L"];
const sizePrice = [73, 153, 243]; //price for drink sizes
const foodPrice = [205, 213, 186, 200, 65, 244]; //price for food

//For getting all 'Add to Order' buttons
const elements = document.getElementsByClassName("btn btn-primary");

//Adding eventListener for all 'Add to Order' buttons for the drinks
for (let i = 0; i < 9; i++) {	
	elements[i].addEventListener('click', function() {
		//Getting div.overlfow-auto inside 'Ordered Items'
		const container = document.querySelector('.overflow-auto');
		
		//Getting the product name 
		const prodName = "prodName" + i;
		const product = document.getElementById(prodName).innerHTML;
		
		//Getting the size input from the user
		const drinkSize = "drinkSize" + i;
		const sizeIndex = document.getElementById(drinkSize).options.selectedIndex;
		const size = prodSize[sizeIndex];
		
		//Getting the quantity input from the user
		const drinkAmt = "drinkAmt" + i;
		const drinkQty = document.getElementById(drinkAmt).value;
	
		//Adding cards to the ordered items
		const prodItemHTML=`
					  <div class="mt-3 card w-100">
						  <div class="card-body">
							<h3 class="card-title">${product} - ${size}</h3>
							<div class="qtyContainer">
								<p class="card-text">Qty: ${drinkQty}</p>
							</div>
						  </div>
					  </div>
		`
		;
		
		//Adding up the total price
		price = price + (sizePrice[sizeIndex] * drinkQty);
		
		//Inserting the card to the Ordered Items list
		container.insertAdjacentHTML('beforeend', prodItemHTML);
		
		//Changing the total price in the Payment card
		const totalPrice = document.getElementById('totalPrice');
		totalPrice.remove();
		const priceLabel = document.getElementById('priceLabel');
		const priceHTML = `<h1 id="totalPrice">Total: Php ${price}</h1>`;
		priceLabel.insertAdjacentHTML('beforeend', priceHTML);
	
		//Counting the number of ordered items
		n = n + 1;
	})
}


//Adding eventListener for all 'Add to Order' buttons for the food
for (let i = 9; i < elements.length; i++) {
	elements[i].addEventListener('click', function() {
		//Getting div.overlfow-auto inside 'Ordered Items'
		const container = document.querySelector('.overflow-auto');
		
		//Getting the product name
		const prodName = "prodName" + i;
		const product = document.getElementById(prodName).innerHTML;
		
		//Getting the quantity input from the user
		const foodAmt = "foodAmt" + i;
		const foodQty = document.getElementById(foodAmt).value;
	
		//Adding cards to the ordered items
		const prodItemHTML=`
					  <div class="mt-3 card w-100">
						  <div class="card-body">
							<h3 class="card-title">${product}</h3>
							<div class="qtyContainer">
								<p class="card-text">Qty: ${foodQty}</p>
							</div>
						  </div>
					  </div>
		`
		;
		
		//Assigning the proper index to the food price
		k = i - 9;
		price = price + (foodPrice[k] * foodQty);
		
		//Inserting the card to the Ordered Items list
		container.insertAdjacentHTML('beforeend', prodItemHTML);
		
		//Changing the total price in the Payment card
		const totalPrice = document.getElementById('totalPrice');
		totalPrice.remove();
		const priceLabel = document.getElementById('priceLabel');
		const priceHTML = `<h1 id="totalPrice">Total: Php ${price}</h1>`;
		priceLabel.insertAdjacentHTML('beforeend', priceHTML);
	
		//Counting the number of ordered items
		n = n + 1;
	})
}



//Payment function
document.getElementById('pay').addEventListener('click', function() {
	const payment = document.getElementById('totalPay').value;
	
	if (payment < price) {
		alert('Not enough balance. Please try again.');
	}
	else {
		const change = payment - price;
		alert('Thanks for ordering! Here\'s your ' + change + ' pesos change.');
		location.reload();
	}
})



//Getting the container for the drinks and food
const coffeeLink = document.getElementById('coffeeLink');
const foodLink = document.getElementById('foodLink');

//Function for showing the drink menu
const coffeeButton = function() {
	coffeeLink.classList.add("disabled");
	
	foodLink.classList.remove("disabled");
	
	const coffeeContainer = document.getElementById('coffeeContainer');
	coffeeContainer.classList.remove("d-none");
	
	const foodContainer = document.getElementById('foodContainer');
	foodContainer.classList.add("d-none");
}

//Function for showing the food menu
const foodButton = function() {
	const foodContainer = document.getElementById('foodContainer');
	foodContainer.classList.remove("d-none");
	
	const coffeeContainer = document.getElementById('coffeeContainer');
	coffeeContainer.classList.add("d-none");
	
	coffeeLink.classList.remove("disabled");

	foodLink.classList.add("disabled");
}

//Assigning the function to the buttons
coffeeLink.addEventListener('click', coffeeButton, false);
foodLink.addEventListener('click', foodButton, false);
