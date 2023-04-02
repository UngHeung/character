/* ===== init ===== */

let wallet = 50000;
let slotMoney = 0;
let change = 0;
let totalPrice = 0;
let totalCount = 0;
let totalPayment = 0;

/* 아이템 이미지 불러오기용 */
const itemsCode = new Map([
    ["Original_Cola", "original"],
    ["Violet_Cola", "violet"],
    ["Yellow_Cola", "yellow"],
    ["Cool_Cola", "cool"],
    ["Green_Cola", "green"],
    ["Orange_Cola", "orange"],
]);

/* 아이템별 가격 */
const itemsPrice = new Map([
    ["Original_Cola", 1000],
    ["Violet_Cola", 1000],
    ["Yellow_Cola", 1000],
    ["Cool_Cola", 1000],
    ["Green_Cola", 1000],
    ["Orange_Cola", 1000],
]);

/* 아이템 재고 */
const itemsStock = new Map([
    ["Original_Cola", 10],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 10],
    ["Cool_Cola", 10],
    ["Green_Cola", 10],
    ["Orange_Cola", 10],
]);

/* 선택 아이템 개수 */
const itemsCount = new Map([
    ["Original_Cola", 0],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 0],
    ["Cool_Cola", 0],
    ["Green_Cola", 0],
    ["Orange_Cola", 0],
]);

/* 구매 아이템 개수 */
const getCount = new Map([
    ["Original_Cola", 0],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 0],
    ["Cool_Cola", 0],
    ["Green_Cola", 0],
    ["Orange_Cola", 0],
]);

/* 상품 목록 */
const itemsList = ["Original_Cola", "Violet_Cola", "Yellow_Cola", "Cool_Cola", "Green_Cola", "Orange_Cola"];

/* ===== setter ===== */
function setSlotMoney(money) {
    slotMoney = money;
}

function setTotalPrice(price) {
    totalPrice = price;
}

function setTotalCount(count) {
    totalCount = count;
}

/* ===== getter ===== */

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

function getTotalCount() {
    return totalCount;
}

function getTotalPayment() {
    return totalPayment;
}

/* ===== display information ===== */
const slotChangeDisplay = document.getElementById("change_display");
const totalPaymentDisplay = document.getElementById("total_payment");
const myWalletDisplay = document.getElementById("my_wallet");

function displayChange() {
    slotChangeDisplay.innerText = "";
    slotChangeDisplay.insertAdjacentText("beforeend", `${change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
}

function displayTotalPayment() {
    totalPaymentDisplay.innerText = "";
    totalPaymentDisplay.insertAdjacentText("beforeend", `${totalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
}

function displayMyWallet() {
    myWalletDisplay.innerText = "";
    myWalletDisplay.insertAdjacentText("beforeend", `${wallet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
}

function displaySelectItemCount(itemName) {
    if (itemsCount.get(itemName) != 0) {
        const selectItemCount = document.querySelector(`.${itemName}-count`);
        selectItemCount.innerText = "";
        selectItemCount.insertAdjacentText("beforeend", `${itemsCount.get(itemName)}`);
    }
}

displayChange();
displayTotalPayment();
displayMyWallet();

/* ===== calculation ===== */
/* 입금액 합산 */
function calSlotMoney(money) {
    slotMoney += money;
}

/* 입금액 만큼 소지금 차감 */
function calWallet(money) {
    wallet -= money;
}

/* 아이템 가격 총액 계산 */
function calTotalPrice(type, price) {
    if (type == "+") {
        totalPrice += price;
    } else if (type == "-") {
        totalPrice -= price;
    }
}

/* 입금액에서 가격 총액을 뺀 나머지 거스름돈 계산 */
function calChange() {
    change = slotMoney - totalPrice;
}

/* 가격 총액을 총 지불 금액에 합산 */
function calTotalPayment() {
    totalPayment += totalPrice;
}

/* 선택, 재고, 구매 */
function calCountAndStock(type, itemName) {
    if (type == "add") {
        // 추가시 선택 개수 ++, 재고 --, 획득 개수 ++
        itemsCount.set(itemName, itemsCount.get(itemName) + 1);
        itemsStock.set(itemName, itemsStock.get(itemName) - 1);
    } else if (type == "delete") {
        // 삭제시 선택 개수 --, 재고 ++, 획득 개수 --
        itemsCount.set(itemName, itemsCount.get(itemName) - 1);
        itemsStock.set(itemName, itemsStock.get(itemName) + 1);
    }
    console.log(itemsCount.get(itemName), itemsStock.get(itemName));
}

/* 아이템 구매 개수 */
function calGetCount() {
    itemsList.forEach((itemName) => {
        if (checkGetCount("count", itemName)) {
            console.log(itemName);
            const itemCount = itemsCount.get(itemName);
            getCount.set(itemName, getCount.get(itemName) + itemCount);
        }
    });
}

/* 구입 후 입금액을 잔액으로 변경 */
function remainSlotMoney() {
    slotMoney = change;
}

/* ===== function ===== */
/* 메뉴 목록 생성 */
const menuList = document.querySelector(".items-list");

function makeMenuList() {
    itemsList.forEach((itemName) => {
        const item = document.createElement("li");
        const button = document.createElement("button");
        const itemCode = itemsCode.get(itemName);

        button.setAttribute("type", "button");
        button.setAttribute("value", `${itemName}`); // 버튼 클릭 시 가져오기 위한 value
        button.setAttribute("class", `in-stock ${itemName}`); // instock은 재고 있음, soldout은 재고 없음

        // 첫 목록 생성시 재고 없으면 instock 대신 soldout, disabled로 비활성화
        if (!checkStock("makeList", itemName)) {
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

/* 입금 */
const insertInput = document.getElementById("insert_input");
const insertButton = document.getElementById("insert_button");

function slotInsertButton() {
    insertButton.addEventListener("click", () => {
        const money = parseInt(insertInput.value);
        if (checkWallet()) {
            // 입금할 소지금이 남아있는지 확인
            if (checkSlotInsert(money)) {
                calSlotMoney(money); // 입금된 돈을 slotMoney에 합산
                calChange(); // 입금된 돈에서 선택된 상품의 총액을 뺀 나머지를 계산
                calWallet(money); // 소지금 차감
                displayChange(); // 잔액 표시
                displayMyWallet(); // 소지금 표시
            }
        }
        insertInput.value = ""; // 입금 후 input 값 초기화
    });
}

slotInsertButton();

/* 거스름돈 반환 버튼 */
const changeButton = document.getElementById("change_button");

function slotChangeButton() {
    changeButton.addEventListener("click", () => {
        if (checkTotalCount("change")) {
            if (checkChange()) {
                resetChange(); // 거스름돈 초기화
                calChange(); // 거스름돈 계산
                displayChange(); // 잔액 표시
            }
        }
    });
}

slotChangeButton();

/* 메뉴 아이템 버튼 이벤트 추가 */
const menuItem = document.querySelectorAll(".in-stock");

function selectMenuButton() {
    menuItem.forEach((item) => {
        item.addEventListener("click", () => {
            const itemName = item.value;

            // 재고 확인
            if (checkStock("none", itemName)) {
                addSelectList(itemName); // 선택 아이템 목록 추가

                calCountAndStock("add", itemName); // 선택 아이템 개수, 재고 계산

                calTotalPrice("+", itemsPrice.get(itemName)); // 선택 아이템 가격을 가격 총액에 합산
                calChange(); // 거스름돈 계산
                displayChange(); // 잔액 표시
                displaySelectItemCount(itemName); // 같은 종류의 아이템 선택 개수 표시

                totalCount++; // 선택된 아이템 총 개수 ++
            }
        });
    });
}

selectMenuButton();

/* 선택된 아이템 목록 */
const selectList = document.querySelector(".select-list");

function addSelectList(itemName) {
    const selectItem = document.createElement("li");
    const selectButton = document.createElement("button");

    if (checkCount("add", itemName)) {
        selectButton.setAttribute("type", "button");
        selectButton.setAttribute("value", `${itemName}`);

        selectButton.insertAdjacentHTML("beforeend", `<img src="images/${itemsCode.get(itemName)}.png" alt="${itemName.replace("_", " ")} image" class="select-img">`);
        selectButton.insertAdjacentHTML("beforeend", `<strong class="item-name">${itemName}</strong>`);
        selectButton.insertAdjacentHTML("beforeend", `<span class="${itemName}-count">${itemsCount.get(itemName) + 1}</span>`);

        selectItem.appendChild(selectButton);
        selectList.appendChild(selectItem);

        /* 목록 아이템 삭제 */
        selectButton.addEventListener("click", () => {
            if (checkCount("remove", itemName)) {
                // 같은 종류의 마지막 아이템이면 목록에서 삭제
                selectList.removeChild(selectItem);
                calCountAndStock("delete", itemName);
            } else {
                // 같은 종류의 아이템이 마지막이 아니면 개수만 감소
                calCountAndStock("delete", itemName);
                displaySelectItemCount(itemName); // 변경된 아이템 개수 표시
            }
            calTotalPrice("-", itemsPrice.get(itemName)); // 선택 아이템 가격을 가격 총액에서 차감
            calChange(); // 거스름돈 계산
            displayChange(); // 잔액 표시

            totalCount--; // 선택된 아이템 총 개수 --
        });
    }
}

/* 구매한 아이템 목록 */
const dispenserList = document.querySelector(".dispenser-list");

function addDispenserList() {
    itemsList.forEach((itemName) => {
        // 선택된 아이템이 있는지 확인
        if (!checkCount("add", itemName)) {
            // 이미 구매한 같은 종류의 아이템이 있는지 확인
            if (checkGetCount("get", itemName)) {
                const getItem = document.createElement("li");
                const getItemButton = document.createElement("button");

                getItemButton.setAttribute("type", "button");
                getItemButton.setAttribute("class", `${itemName}-get`);
                getItemButton.setAttribute("disabled", "");

                getItemButton.insertAdjacentHTML("beforeend", `<img src="images/${itemsCode.get(itemName)}.png" alt="${itemName.replace("_", " ")} image" class="select-img">`);
                getItemButton.insertAdjacentHTML("beforeend", `<strong class="item-name">${itemName}</strong>`);
                getItemButton.insertAdjacentHTML("beforeend", `<span class="${itemName}-count">${itemsCount.get(itemName)}</span>`);

                getItem.appendChild(getItemButton);
                dispenserList.appendChild(getItem);
            } else {
                const getItemCount = document.querySelector(`.${itemName}-get>span`);
                getItemCount.innerText = "";
                getItemCount.insertAdjacentText("beforeend", `${getCount.get(itemName) + itemsCount.get(itemName)}`);
            }
        }
    });
}

/* 획득 버튼 이벤트 */
const getItemsButton = document.getElementById("get_button");

function getButton() {
    getItemsButton.addEventListener("click", () => {
        if (checkPayment()) {
            if (checkTotalCount("get")) {
                calTotalPayment(); // 구매 총액에 가격 총액 합산

                addDispenserList(); // 구매 목록 생성

                calGetCount(); // 아이템별 구매 개수 추가

                resetItemsCout(); // 선택 아이템 개수 초기화
                remainSlotMoney(); // 거스름돈을 입금액으로 변경
                resetTotalPrice(); // 가격 총액 초기화

                resetItemList(); // 메뉴 목록 초기화
                resetSelectList(); // 선택 목록 초기화
                resetTotalCount(); // 총 선택 개수 초기화

                displayTotalPayment(); // 구매 총액 표시
                displayChange(); // 잔액 표시
            }
        }
    });
}

getButton();

/* ===== validation check ===== */
/* 소지금 확인 */
function checkWallet() {
    const insertMoney = parseInt(insertInput.value);

    if (wallet < insertMoney) {
        alert(`소지금 부족! ${wallet}원 남았습니다.`);
        return false;
    }

    return true;
}

/* 아이템 재고 확인 */
function checkStock(type, itemName) {
    if (itemsStock.get(itemName) == 0) {
        if (type != "makeList") {
            alert(`${itemName}의 재고가 부족합니다.`);
        }
        return false;
    }

    return true;
}

/* 입력된 값이 천원 단위인지 확인 */
function checkSlotInsert(money) {
    if (money % 1000 != 0) {
        alert("1,000원 단위로만 입금 가능합니다.");
        return false;
    }

    return true;
}

/* 거스름돈이 있는지 확인 */
function checkChange() {
    if (change == 0) {
        alert("거스름돈이 없습니다.");
        return false;
    }

    alert(`${change}원이 반환되었습니다.`);
    return true;
}

/* 선택된 물건이 있는지 확인 */
function checkTotalCount(type) {
    if (type == "get") {
        // 구매할 때 선택된 물건이 있는지 확인
        if (totalCount == 0) {
            alert("선택된 상품이 없습니다.");
            return false;
        }
    } else if (type == "change") {
        // 거스름돈을 반환할 때 선택된 물건이 있는지 확인
        if (totalCount > 0) {
            alert("선택된 상품이 있습니다.");
            return false;
        }
    }

    return true;
}

/* 목록에서 추가, 삭제할 아이템 개수 확인 */
function checkCount(type, itemName) {
    if (type == "add") {
        // 같은 종류의 아이템이 있는지 확인
        if (itemsCount.get(itemName) != 0) {
            return false;
        }
    } else if (type == "remove") {
        // 같은 종류의 아이템이 없는지 확인
        if (itemsCount.get(itemName) != 1) {
            return false;
        }
    }

    return true;
}

/* 구매 금액이 충분한지 확인 */
function checkPayment() {
    if (change < 0) {
        alert(`${change * -1}원이 부족합니다.`);
        return false;
    }

    return true;
}

/* 아이템 구매 개수 확인 */
function checkGetCount(type, itemName) {
    if (type == "count") {
        // 구매시 선택된 아이템이 있는지 확인
        if (itemsCount.get(itemName) == 0) {
            return false;
        }
    } else if (type == "get") {
        // 같은 종류의 아이템을 구매했었는지 확인
        console.log(getCount.get(itemName));
        if (getCount.get(itemName) != 0) {
            return false;
        }
    }

    return true;
}

/* ===== reset ===== */
/* 거스름돈 초기화 */
function resetChange() {
    slotMoney = 0;
    calChange();
}

/* 선택 아이템 개수 초기화 */
function resetItemsCout() {
    itemsList.forEach((item) => {
        itemsCount.set(item, 0);
    });
}

/* 재고 변경에 따른 메뉴 초기화 */
function resetItemList() {
    itemsList.forEach((itemName) => {
        const item = document.querySelector(`.${itemName}`);

        if (itemsStock.get(itemName) == 0) {
            // 재고가 0인 아이템은 soldout 처리
            item.setAttribute("class", `soldout ${itemName}`);
            item.setAttribute("disabled", "");
        }
    });
}

/* 가격 총액 초기화 */
function resetTotalPrice() {
    totalPrice = 0;
}

/* 선택 목록 초기화 */
function resetSelectList() {
    selectList.innerHTML = "";
}

/* 선택 총 개수 초기화 */
function resetTotalCount() {
    totalCount = 0;
}
