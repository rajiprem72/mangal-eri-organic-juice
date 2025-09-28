// script.js

const juices = [
  { id: 1, name: "அருகம்புல் சாறு", benefit: "இரத்தம் சுத்தம் செய்யும், குடல் பிரச்சனை தீரும்", price: 20 },
  { id: 2, name: "ஆவாரம் பூ சாறு", benefit: "சர்க்கரை நோய் சரியாகும்", price: 20 },
  { id: 3, name: "பீட்ரூட்,கேரட், தேங்காய்பால்", benefit: "ரத்தம் விருத்தியாகும்", price: 30 },
  { id: 4, name: "வெற்றிலை பதினா துளசி", benefit: "சளி குணமாகும், நரம்பு தளர்ச்சி குணமாகும், உடல் உஷ்ணத்தை தீர்க்கும்", price: 20 },
  { id: 5, name: "மணத்தக்காளி மோர்", benefit: "வயிற்றுப் புண்கள் குணமாகும், ரத்தம் விருத்தி செய்யும்", price: 20 },
  { id: 6, name: "வெண்பூசனி சாறு", benefit: "உடல் சூட்டை தணிக்கும்", price: 20 },
  { id: 7, name: "வில்வம் சாறு", benefit: "நோய் எதிர்ப்பு சக்தி தரும்", price: 20 },
  { id: 8, name: "கீழா நெல்லி சாறு", benefit: "உடல் சூட்டை தணிக்கும், கல்லீரல், மண்ணீரல், கணையம், மஞ்சள் காமாலை தடுக்கும்", price: 20 },
  { id: 9, name: "வாழைத் தண்டு சாறு", benefit: "கல்லடைப்பை தடுக்கும்", price: 20 },
  { id: 10, name: "நெல்லிக்காய் சாறு", benefit: "இளநரை தடுக்கும் அழகு கூடும்", price: 20 },
  { id: 11, name: "பாகற்காய் சாறு", benefit: "சர்க்கரை நோய் குணப்படுத்தும்", price: 20 },
  { id: 12, name: "துளசி சாறு", benefit: "உடல் சூட்டை தணிக்கும்", price: 20 }
];

const juiceList = document.getElementById("juice-list");
const totalEl = document.getElementById("total");
let cart = {};

function renderJuices() {
  juices.forEach(juice => {
    cart[juice.id] = 0;

    const item = document.createElement("div");
    item.className = "juice-item";

    item.innerHTML = `
      <div class="juice-info">
        <div class="juice-title">${juice.name} - ₹${juice.price}</div>
        <div class="juice-benefit">${juice.benefit}</div>
      </div>
      <div class="counter">
        <button onclick="decrement(${juice.id})">-</button>
        <span id="qty-${juice.id}">0</span>
        <button onclick="increment(${juice.id})">+</button>
      </div>
    `;

    juiceList.appendChild(item);
  });
}

function increment(id) {
  cart[id]++;
  document.getElementById(`qty-${id}`).textContent = cart[id];
  updateTotal();
}

function decrement(id) {
  if (cart[id] > 0) {
    cart[id]--;
    document.getElementById(`qty-${id}`).textContent = cart[id];
    updateTotal();
  }
}

function updateTotal() {
  let total = 0;
  for (let id in cart) {
    total += cart[id] * juices.find(j => j.id == id).price;
  }
  totalEl.textContent = total.toFixed(2); // ensure two decimals
}

function generateUPILink() {
  let total = parseFloat(totalEl.textContent);
  if (!total || total <= 0) {
    alert("Please select at least one juice before proceeding to payment.");
    return;
  }

  let note = [];
  let itemCount = 0;

  for (let id in cart) {
    if (cart[id] > 0) {
      note.push(`${juices.find(j => j.id == id).name} x${cart[id]}`);
      itemCount++;
    }
  }

  let transactionNote = (itemCount > 1) ? "Organic Juice" : note.join(", ");
  let upiId = "q580583273@ybl";
  let name = "Ravi P";
  let amountStr = total.toFixed(2); // ensure two decimals

  let upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amountStr)}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  window.location.href = upiLink;
}

document.getElementById("payButton").addEventListener("click", generateUPILink);

renderJuices();
