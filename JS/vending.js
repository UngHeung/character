/* ========== init ========== */
/* interaction information */
let wallet = 25000;
let slotMoney = 0;
let change = 0;
let totalPrice = 0;
let totalCount = 0;

/* items code */
const itemsCode = new Map([
    ["Original_Cola", "original"],
    ["Violet_Cola", "violet"],
    ["Yellow_Cola", "yellow"],
    ["Cool_Cola", "cool"],
    ["Green_Cola", "green"],
    ["Orange_Cola", "orange"],
]);

/* items price */
const itemsPrice = new Map([
    ["Original_Cola", 1000],
    ["Violet_Cola", 1000],
    ["Yellow_Cola", 1000],
    ["Cool_Cola", 1000],
    ["Green_Cola", 1000],
    ["Orange_Cola", 1000],
]);

/* items stock */
const itemsStock = new Map([
    ["Original_Cola", 10],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 10],
    ["Cool_Cola", 10],
    ["Green_Cola", 10],
    ["Orange_Cola", 10],
]);

/* items count */
const itemsCount = new Map([
    ["Original_Cola", 0],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 0],
    ["Cool_Cola", 0],
    ["Green_Cola", 0],
    ["Orange_Cola", 0],
]);

/* get items Count */
const getCount = new Map([
    ["Original_Cola", 0],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 0],
    ["Cool_Cola", 0],
    ["Green_Cola", 0],
    ["Orange_Cola", 0],
]);

/* items list */
const itemsList = ["Original_Cola", "Violet_Cola", "Yellow_Cola", "Cool_Cola", "Green_Cola", "Orange_Cola"];

/* make menu list */
const menuList = document.querySelector(".items-list");

function makeMenuList() {
    itemsList.forEach((itemName) => {
        const item = document.createElement("li");
        const button = document.createElement("button");
        const itemCode = itemsCode.get(itemName);

        button.setAttribute("type", "button");
        button.setAttribute("value", `${itemName}`);
        button.setAttribute("class", `in-stock ${itemName}`);

        // stock check
        if (itemsStock.get(itemName) == 0) {
            button.setAttribute("class", `soldout ${itemName}`);
            button.setAttribute("disabled", "");
        }

        button.insertAdjacentHTML("beforeend", `<img src="images/${itemCode}.png" alt="${itemName.replace("_", " ")} image" class="item-img">`);
        button.insertAdjacentHTML("beforeend", `<strong class="item-name">${itemName}</strong>`);
        button.insertAdjacentHTML("beforeend", `<span class="item-price">${itemsPrice.get(itemName)}원</span>`);

        item.appendChild(button);
        menuList.appendChild(item);
    });
}

makeMenuList();

/* ========== setter, getter ========== */
function setSlotMoney(money) {
    slotMoney += money;
}

function setTotalPrice(price) {
    totalPrice += price;
}

function getWallet() {
    return wallet;
}

function getSlotMoney() {
    return slotMoney;
}

function getChange() {
    return change;
}

function getTotalPrice() {
    return totalPrice;
}

/* ========== calculation ========== */
function selectItemCal(itemName) {
    setTotalPrice(itemsPrice.get(itemName));
}

function deleteItemCal(itemName) {
    setTotalPrice(itemsPrice.get(itemName) * -1);
}

function countAndStockCal(type, itemName) {
    if (type == "add") {
        itemsCount.set(itemName, itemsCount.get(itemName) + 1);
        itemsStock.set(itemName, itemsStock.get(itemName) - 1);
        getCount.set(itemName, getCount.get(itemName) + 1);
    } else if (type == "delete") {
        itemsCount.set(itemName, itemsCount.get(itemName) - 1);
        itemsStock.set(itemName, itemsStock.get(itemName) + 1);
        getCount.set(itemName, getCount.get(itemName) - 1);
    }
}

function changeCal() {
    change = slotMoney - totalPrice;
}

function getItemsCal() {
    slotMoney = change;
}

/* ========== display ========== */
const slotChangeDisplay = document.getElementById("change_display");
const totalPriceDisplay = document.getElementById("total_price");
const myWalletDisplay = document.getElementById("my_wallet");

function displayChange() {
    slotChangeDisplay.innerText = `${getChange()}`;
}

function displaySelectItemCount(itemName) {
    if (itemsCount.get(itemName) != 0) {
        const selectItemCount = document.querySelector(`.${itemName}-count`);
        selectItemCount.innerText = `${itemsCount.get(itemName)}`;
    }
}

function displayTotalPrice() {
    totalPriceDisplay.innerText = `${totalPrice}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMyWallet() {
    myWalletDisplay.innerText = `${wallet}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

displayChange();
displayTotalPrice();
displayMyWallet();

/* ========== function ========== */
const menuItem = document.querySelectorAll(".in-stock");

const slotInsertInput = document.getElementById("insert_input");
const slotChangeButton = document.getElementById("change_button");
const slotInsertButton = document.getElementById("insert_button");
const getItemsButton = document.getElementById("get_button");

const selectList = document.querySelector(".select-list");
const getList = document.querySelector(".dispenser-list");

/* select menu button */
function selectMenuButton() {
    menuItem.forEach((item) => {
        item.addEventListener("click", () => {
            const itemName = item.value;

            if (checkStock(itemName)) {
                addSelectList(itemName);

                countAndStockCal("add", itemName);

                selectItemCal(itemName);
                changeCal();
                displayChange();
                displaySelectItemCount(itemName);
                displayTotalPrice();

                totalCount++;
            }
        });
    });
}

selectMenuButton();

/* slot button */
function slotButton() {
    slotInsertButton.addEventListener("click", () => {
        const money = parseInt(slotInsertInput.value);
        slotInsertInput.value = "";

        if (checkSlotInsert(money)) {
            setSlotMoney(money);
            changeCal();
            displayChange();
        }
    });

    slotChangeButton.addEventListener("click", () => {
        if (checkTotalCount("change")) {
            if (checkChange()) {
                changeReset();
                displayChange();
            }
        }
    });
}

slotButton();

function getButton() {
    getItemsButton.addEventListener("click", () => {
        if (checkPayment()) {
            if (checkTotalCount("get")) {
                getItemReset();
                getItemsCal();
                displayChange();
                displayTotalPrice();
            }
        }
    });
}

getButton();

/* add select list */
function addSelectList(itemName) {
    const selectItem = document.createElement("li");
    const selectButton = document.createElement("button");

    if (checkCount("add", itemName)) {
        selectButton.setAttribute("type", "button");
        selectButton.setAttribute("value", `${itemName}`);

        selectButton.insertAdjacentHTML("beforeend", `<img src="images/${itemsCode.get(itemName)}.png" alt="Original Cola Image" class="select-img">`);
        selectButton.insertAdjacentHTML("beforeend", `<strong class="item-name">${itemName}</strong>`);
        selectButton.insertAdjacentHTML("beforeend", `<span class="${itemName}-count">${itemsCount.get(itemName) + 1}</span>`);

        selectItem.appendChild(selectButton);
        selectList.appendChild(selectItem);

        /* select item remove */
        selectButton.addEventListener("click", () => {
            if (checkCount("remove", itemName)) {
                selectList.removeChild(selectItem);
                countAndStockCal("delete", itemName);
            } else {
                countAndStockCal("delete", itemName);
                displaySelectItemCount(itemName);
            }
            deleteItemCal(itemName);
            changeCal();
            displayChange();
            displayTotalPrice();

            totalCount--;
        });
    }
}

/* add get list */
function addGetList() {
    itemsList.forEach((itemName) => {
        if (itemsCount.get(itemName) != 0) {
            const getItem = document.createElement("li");
            const getButton = document.createElement("button");

            if (checkCount("add", itemName)) {
                getButton.setAttribute("type", "button");
                getButton.setAttribute("value", `${itemName}`);

                getButton.insertAdjacentHTML("beforeend", `<img src="images/${itemsCode.get(itemName)}.png" alt="Original Cola Image" class="select-img">`);
                getButton.insertAdjacentHTML("beforeend", `<strong class="item-name">${itemName}</strong>`);
                getButton.insertAdjacentHTML("beforeend", `<span class="${itemName}-count">${getCount.get(itemName)}</span>`);

                getItem.appendChild(getButton);
                getList.appendChild(getItem);

                /* select item remove */
                getButton.addEventListener("click", () => {});
            }
        }
    });
}

/* ========== validate check ========== */
/* check stock */
function checkStock(itemName) {
    if (itemsStock.get(itemName) == 0) {
        alert(`${itemName}의 재고가 부족합니다.`);
        return false;
    }

    return true;
}

/* check count */
function checkCount(type, itemName) {
    if (type == "add") {
        if (itemsCount.get(itemName) == 0) {
            return true;
        }
    } else if (type == "remove") {
        if (itemsCount.get(itemName) == 1) {
            return true;
        }
    }

    return false;
}

/* check change */
function checkChange() {
    if (change > 0) {
        alert(`${change}원이 반환되었습니다.`);
        return true;
    }

    alert("거스름돈이 없습니다.");
    return false;
}

/* check slot insert */
function checkSlotInsert(money) {
    if (money % 1000 == 0) {
        return true;
    }

    alert("1,000원 단위로만 입금 가능합니다.");
    return false;
}

/* check checkPayment */
function checkPayment() {
    if (change < 0) {
        alert(`${change * -1}원이 부족합니다.`);
        return false;
    }

    return true;
}

function checkTotalCount(type) {
    if (type == 1) {
        if (totalCount == "get") {
            alert("선택된 상품이 없습니다.");
            return false;
        }
    } else if (type == "change") {
        if (totalCount > 0) {
            alert("선택된 상품이 있습니다.");
            return false;
        }
    }

    return true;
}

/* ========== reset ========== */
function changeReset() {
    slotMoney = 0;
    change = 0;
}

changeReset();

function getItemReset() {
    itemsList.forEach((item) => {
        itemsCount.set(item, 0);
    });

    totalPrice = 0;
    totalCount = 0;
    slotMoney = change;
    selectList.innerHTML = "";
    itemListReset();
    addGetList();
}

function itemListReset() {
    itemsList.forEach((itemName) => {
        console.log(itemName);
        const item = document.querySelector(`.${itemName}`);

        if (itemsStock.get(itemName) == 0) {
            item.setAttribute("class", `soldout ${itemName}`);
            item.setAttribute("disabled", "");
        }
    });
}
