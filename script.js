let menuData = [];

fetch("menu.json")
  .then((response) => response.json())
  .then((data) => {
    menuData = data.items || [];
  });

function showMenu() {
  const content = document.getElementById("content");
  if (menuData.length === 0) {
    content.innerHTML = "<p>No items available.</p>";
    return;
  }

  let html = `<table>
        <tr><th>ID</th><th>Name</th><th>Price</th></tr>`;

  menuData.forEach((item) => {
    html += `<tr><td>${item.id}</td><td>${item.name}</td><td>₹${item.price}</td></tr>`;
  });
  html += `</table>`;
  content.innerHTML = html;
}

function orderItems() {
  const content = document.getElementById("content");
  let html = `
        <h2>Order Items</h2>
        <p>Enter item IDs separated by commas (e.g., 1,2):</p>
        <input type="text" id="orderInput" placeholder="Item IDs">
        <button class="submit" onclick="submitOrder()">Submit Order</button>
        <div id="billOutput"></div>
    `;
  content.innerHTML = html;
}

function submitOrder() {
  const ids = document
    .getElementById("orderInput")
    .value.split(",")
    .map((id) => parseInt(id.trim()));
  let bill = 0;
  let output = `<table><tr><th>ID</th><th>Name</th><th>Price</th></tr>`;

  ids.forEach((id) => {
    const item = menuData.find((i) => i.id === id);
    if (item) {
      output += `<tr><td>${item.id}</td><td>${item.name}</td><td>₹${item.price}</td></tr>`;
      bill += parseInt(item.price);
    }
  });

  output += `</table><h3>Total Bill: ₹${bill}</h3>`;
  document.getElementById("billOutput").innerHTML = output;
}

function addMenuItem() {
  const content = document.getElementById("content");
  content.innerHTML = `
        <h2>Add Menu Item</h2>
        <input type="text" id="itemName" placeholder="Item Name">
        <input type="number" id="itemPrice" placeholder="Item Price">
        <select id="itemType">
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
        </select>
        <button class="submit" onclick="submitNewItem()">Add Item</button>
    `;
}

function submitNewItem() {
  const name = document.getElementById("itemName").value;
  const price = document.getElementById("itemPrice").value;
  const type = document.getElementById("itemType").value;

  const newItem = {
    id: menuData.length + 1,
    name: name,
    price: parseInt(price),
    veg: type === "veg",
    reviews: [],
  };

  menuData.push(newItem);
  alert(
    "Item added! Note: To save permanently, this requires backend support."
  );
  showMenu(); // Refresh menu
}
