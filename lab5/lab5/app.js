
// window.onload=initfunction;
// function initfunction() {
//     var toDay = new Date();	
//     document.getElementById("dtfield").innerHTML = toDay;
// }
var form = document.getElementById("orderForm"); 
form.addEventListener('submit', processOrder);

var addItems = document.getElementById("addItems"); 
addItems.addEventListener('click', addOrder);
var id = 0;

var customerOrder = {
    customer:{
        fname: '',
        lname: '',
        address: '',
        phone: ''
    },
    order:{
        pizza:[],
        sandwich:[],
        drink:[]
    },
    total: 0
}

function addOrder(){
    var pizzaType = displayRadioValue('pizza type');
    var pizzaSize = displayRadioValue('pizza size');
    var toppings = getCheckedBoxes('top[]');
    var pizzaQty = document.getElementById('pizzaQty').value;
    var sandwichType = displayRadioValue('sandwich type');
    var sandwichQty = document.getElementById('sandwichQty').value;
    var drinkType = document.getElementById('drink').options[document.getElementById('drink').selectedIndex].value;
    var drinkSize = displayRadioValue('drink size');
    var drinkQty = document.getElementById('drinkQty').value;

    var pizzaTopPrice = [];
    var pizzaTopName = [];
    
    toppings.map(function(topping){
        pizzaTopPrice.push(parseFloat(getPrice(topping)));
        pizzaTopName.push(getName(topping));
    })
    
    var totalToppingPrice = pizzaTopPrice.reduce(function(a, b){
        return a + b;
    }, 0);

    var totalPizzaPrice = (parseFloat(getPrice(pizzaSize))+totalToppingPrice)*pizzaQty;
    var pizzaOrderText = pizzaQty+" "+getName(pizzaSize)+" "+pizzaType+", "+ pizzaTopName;
    //pizzaOrder.innerHTML += `<div><div>${pizzaOrderText}</div><div>${totalPizzaPrice}</div></div>`;
    
    

    var sandwichOrderText = sandwichQty+" "+getName(sandwichType);
    var totalSandwichPrice = parseFloat(getPrice(sandwichType))*sandwichQty;
    //sandwichOrder.innerHTML += `<div><div>${sandwichOrderText}</div><div>${totalSandwichPrice}</div></div>`;
    

    var drinkOrderText = drinkQty+" "+getName(drinkSize)+" "+drinkType;
    var totalDrinkPrice = parseFloat(getPrice(drinkSize))*drinkQty;
    customerOrder.total = customerOrder.total+ totalPizzaPrice+ totalSandwichPrice+ totalDrinkPrice;
    //drinkOrder.innerHTML += `<div><div>${drinkOrderText}</div><div>${totalDrinkPrice}</div></div>`;
    customerOrder.order.pizza.push({pizzaOrder: pizzaOrderText, pizzaPrice: totalPizzaPrice});
    
    customerOrder.order.sandwich.push({sandwichOrder: sandwichOrderText, sandwichPrice: totalSandwichPrice});

    ;
    customerOrder.order.drink.push({drinkOrder: drinkOrderText, drinkPrice: totalDrinkPrice});

    console.log('customerOrder is=',customerOrder);
    form.reset();
}


function processOrder(e){
    var fname = document.getElementById('Fname').value;
    var lname = document.getElementById('Lname').value;
    var addr = document.getElementById('addr').value;
    var phone =document.getElementById('phone').value;
    var pizzaOrder = document.getElementById('pizzaContainer');
    var sandwichOrder = document.getElementById('sandwichContainer');
    var drinkOrder = document.getElementById('drinkContainer');
    var customerInfo = document.getElementById('customerInfo');
    var orderTotal = document.getElementById('orderTotal');

    customerOrder.customer.fname = fname;
    customerOrder.customer.lname = lname;
    customerOrder.customer.address = addr;
    customerOrder.customer.phone = phone;

    
    customerOrder.order.pizza.map(function(p){
        pizzaOrder.innerHTML += `<div><div>${p.pizzaOrder}</div><div>$${p.pizzaPrice}</div></div>`;
    
    });
    
    customerOrder.order.sandwich.map(function(s){
        sandwichOrder.innerHTML += `<div><div>${s.sandwichOrder}</div><div>$${s.sandwichPrice}</div></div>`;
    
    });
   
    customerOrder.order.drink.map(function(d){
        drinkOrder.innerHTML += `<div><div>${d.drinkOrder}</div><div>$${d.drinkPrice}</div></div>`;
    
    });
    customerInfo.innerHTML = `<div>${customerOrder.customer.fname} ${customerOrder.customer.lname}</div><div>${customerOrder.customer.address}</div><div>${customerOrder.customer.phone}</div>`;
    orderTotal.innerHTML += customerOrder.total;
    var fileName = 'orderObject'+id;
    localStorage.setItem(fileName, JSON.stringify(customerOrder));
    id = id+1;
    form.reset();

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    // var orderRow = document.getElementById('orderRow');
    // values.map(function(value){
    //     orderRow.innerHTML = 
    //     `<tr>
    //      <td>${value.customer.fname}</td>
    //      <td>${value.customer.lname}</td>
    //      <td>${value.customer.phone}</td>
    //      <td>${value.customer.address}</td>
    //      <td><input type="button" id=update value="update"></td>
    //     </tr>`
    // });
    e.preventDefault();
}

function displayRadioValue(radio_name) { 
    var ele = document.getElementsByName(radio_name); 
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        return ele[i].value; 
    } 
} 

function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    for (var i=0; i<checkboxes.length; i++) {
       if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i].value);
       }
    }
    return checkboxesChecked;
}

function getPrice(str){
    return str.slice((str.indexOf('$'))+1);
}

function getName(str){
 return str.slice(0, (str.indexOf('$'))-1)
}

