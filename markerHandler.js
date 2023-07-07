AFRAME.registerComponent("markerhandler", {
init: async function() {
this.el.addEventListener("markerFound", () => { 
console.log("marker is found");
this.handleMarkerFound();
});
this.el.addEventListener("markerLost", () => {
console.log("marker is lost");
this.handleMarkerLost();
});
},


handleMarkerFound: function() {
var buttonDiv = document.getElementById("button-div");
buttonDiv.style.display = "flex";
var orderButtton = document.getElementById("order-button");
var orderSummaryButtton = document.getElementById("order-summary-button");

orderButtton.addEventListener("click", () => {
swal({
icon: "https://i.imgur.com/4NZ6uLY.jpg", title: "Thanks For Order !",
title: "Thanks For Order !",
text: " ",
timer:  2000,
buttons: false
});
});

orderSummaryButtton.addEventListener("click", () => {
swal({
icon: "warning",
title: "Order Summary",
text: "Work In Progress"
});
});
},


handleMarkerLost :function() {
    
    var buttonDiv = document.getElementById("button-div")
    buttonDiv.style.display = "none" 

},

getAllToys: async function() { 
return await firebase
.firestore()
.collection("toys")
.get()
.then(snap => {
return snap.docs.map(doc => doc.data());
});
},

handleOrder: function (uid, toy) {
// Reading current UID order details
firebase
.firestore()
.collection("users")
.doc (uid)
.get()
.then(doc => {
var details doc.data();

if (details["current_orders"][toy.id]) {
// Increasing Current Quantity
details["current_orders"] [ toy.id]["quantity"] += 1;

//Calculating Subtotal of item
var currentQuantity = details["current_orders"][toy.id]["quantity"];

details["current_orders"][toy.id]["subtotal"] = currentQuantity * toy.price;
} else {
details["current_orders"][toy.id] = {
item: toy.toy_name,
price: toy.price,
quantity: 1,
subtotal: toy.price* 1
};
 }
details.total_bill += toy.price;

// Updating Db
firebase
.firestore()
.collection("users") 
.doc (doc.id)
.update(details);
});
}

AFRAME.registerComponent("createbuttons", {
    init: function() {
    // 1. Create the Order button
    var button1 = document.createElement("button"); 
    button1.innerHTML = "ORDER NOW";
    button1.setAttribute("id", "order-button"); 
    button1.setAttribute("class", "btn btn-danger m1-3 mr-3");
    // 2. Create the Bill button
    var button2 = document.createElement("button"); 
    button2.innerHTML = "ORDER SUMMARY";
    button2.setAttribute("id", "order-summary-button"); 
    button2.setAttribute("class", "btn btn-danger m1-3");
    // 3. Append somewhere
    var buttonDiv = document.getElementById("button-div"); 
    buttonDiv.appendChild(button2); 
    buttonDiv.appendChild(button1);
    }
    });
    
    getorderSummary: async function(uid) {
    return await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then(doc => doc.data());
    };

    handlePayment: function() {
    swal({
        icon: "success",
        title: "Thanks For Paying !",
      });
    }

handleRatings: function(toy) {
// Close Modal
document.getElementById("rating-modal-div").style.display = "flex";
document.getElementById("rating-input").value = "0";

var saveRatingButton = document.getElementById("save-rating-button"); saveRatingButton.addEventListener("click", () => {
document.getElementById("rating-modal-div").style.display = "none";
var rating = document.getElementById("rating-input").value;

firebase
.firestore() 
.collection("toys") 
.doc (toy, id)
.update({
rating: rating
})
.then(() => {
swal({
icon: "success",
title: "Thanks For Rating!",
text: "We Hope You Like Toy !!",
timer: 2500,
buttons: false
});
});
});
}