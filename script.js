document.addEventListener("DOMContentLoaded", () => {
  const menuItemsContainer = document.getElementById("menu-items");
  const orderListContainer = document.getElementById("order-list");
  const totalBillElement = document.getElementById("total-bill");

  let menu = JSON.parse(localStorage.getItem("menu")) || [];
  let order = [];

  // Fetch menu data from JSON file if localStorage is empty
  if (menu.length === 0) {
    fetch("menu.json")
      .then((response) => response.json())
      .then((data) => {
        menu = data.items;
        localStorage.setItem("menu", JSON.stringify(menu)); // Store menu in localStorage
        displayMenu();
      });
  } else {
    displayMenu();
  }

  function displayMenu() {
    menuItemsContainer.innerHTML = "";
    menu.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price} Rs</td>
        <td><button onclick="addToOrder(${item.id})">Order</button></td>
      `;
      menuItemsContainer.appendChild(row);
    });
  }

  window.addToOrder = (id) => {
    const item = menu.find((i) => i.id === id);
    if (item) {
      order.push(item);
      updateOrder();
    }
  };

  function updateOrder() {
    orderListContainer.innerHTML = "";
    let total = 0;
    order.forEach((item) => {
      total += item.price;
      const div = document.createElement("div");
      div.innerHTML = `${item.name} - ${item.price} Rs`;
      orderListContainer.appendChild(div);
    });
    totalBillElement.textContent = total;
  }

  window.addItem = () => {
    const itemName = document.getElementById("item-name").value;
    const itemPrice = parseFloat(document.getElementById("item-price").value);
    const itemType = document.getElementById("item-type").value;

    if (!itemName || !itemPrice) {
      alert("Please enter valid item details.");
      return;
    }

    const newItem = {
      id: menu.length + 1,
      name: itemName,
      price: itemPrice,
      veg: itemType === "veg",
      reviews: [],
    };

    menu.push(newItem);
    localStorage.setItem("menu", JSON.stringify(menu)); // Store updated menu
    displayMenu();
    alert("Item added successfully!");
  };
});
