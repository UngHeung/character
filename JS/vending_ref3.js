/* ===== init value ===== */
let wallet = 50000;
let slotMoney = 0;
let change = 0;
let totalPrice = 0;
let totalCount = 0;
let totalPayment = 0;

/* ===== product list ===== */
const items = [
    {
        name: "Original_Cola",
        code: "original",
        cost: 1000,
        stock: 10,
        count: 0,
        get: 0,
    },
    {
        name: "Violet_Cola",
        code: "violet",
        cost: 1000,
        stock: 0,
        count: 0,
        get: 0,
    },
    {
        name: "Yellow_Cola",
        code: "yellow",
        cost: 1000,
        stock: 10,
        count: 0,
        get: 0,
    },
    {
        name: "Cool_Cola",
        code: "cool",
        cost: 1000,
        stock: 10,
        count: 0,
        get: 0,
    },
    {
        name: "Green_Cola",
        code: "green",
        cost: 1000,
        stock: 10,
        count: 0,
        get: 0,
    },
    {
        name: "Orange_Cola",
        code: "orange",
        cost: 1000,
        stock: 10,
        count: 0,
        get: 0,
    },
];

/* ===== access item information ===== */
function itemInfo(itemName) {
    const drink = items.filter((item) => item.name === itemName);
    return drink[0];
}

let changeItemInfo = function (type, itemName, value) {
    const drink = itemInfo(itemName);
    if (type === "stock") {
        drink.stock = value;
    } else if (type === "count") {
        drink.count = value;
    }
};

/* ===== setter ===== */
function setWallet(money) {
    wallet = money;
}

function setSlotMoney(money) {
    slotMoney = money;
}

function setChange(money) {
    change = money;
}

function setTotalPrice(price) {
    totalPrice = price;
}

function setTotalCount(count) {
    totalCount = count;
}

function setTotalPayment(price) {
    totalPayment = price;
}

// function setItemStock(itemName, value) {
//     itemsStock.set(itemName, value);
// }

// function setItemCount(itemName, value) {
//     itemsCount.set(itemName, value);
// }

// function setSelectCount(itemName, value) {
//     selectCount.set(itemName, value);
// }

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

// function getItemCode(itemName) {
//     return itemsCode.get(itemName);
// }

// function getItemPrice(itemName) {
//     return itemsPrice.get(itemName);
// }

// function getItemStock(itemName) {
//     return itemsStock.get(itemName);
// }

// function getItemCount(itemName) {
//     return itemsCount.get(itemName);
// }

// function getSelectCount(itemName) {
//     return selectCount.get(itemName);
// }

/* ===== display information ===== */
const slotChangeDisplay = document.getElementById("change_display");
const totalPaymentDisplay = document.getElementById("total_payment");
const myWalletDisplay = document.getElementById("my_wallet");

const display = {
    /* "화면 표시 */

    /* 잔액 */
    change: () => {
        slotChangeDisplay.textContent = "";
        slotChangeDisplay.insertAdjacentText(
            "beforeend",
            `${getChange()
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        );
    },

    /* 구매총액 */
    totalPayment: () => {
        totalPaymentDisplay.textContent = "";
        totalPaymentDisplay.insertAdjacentText(
            "beforeend",
            `${getTotalPayment()
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        );
    },

    /* 소지금 */
    myWallet: () => {
        myWalletDisplay.textContent = "";
        myWalletDisplay.insertAdjacentText(
            "beforeend",
            `${getWallet()
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        );
    },

    /* 선택개수 */
    selectItemCount: (itemName) => {
        drink = itemInfo(itemName);
        if (drink.count !== 0) {
            const itemCount = document.querySelector(`.${itemName}-count`);
            itemCount.textContent = `${drink.count}`;
        }
    },
};

display.change();
display.totalPayment();
display.myWallet();
display.totalPayment();

/* ===== calculation ===== */
const cal = {
    /* "금액 계산 기능" */

    /* 입금액 합산 */
    slotMoney: (money) => {
        setSlotMoney(getSlotMoney() + money);
    },

    /* 입금액 만큼 소지금 차감, 거스름돈 소지금 합산 */
    wallet: (type, money) => {
        if (type === "+") {
            setWallet(getWallet() + money);
        } else if (type === "-") {
            setWallet(getWallet() - money);
        }
    },

    /* 아이템 가격 총액 계산 */
    totalPrice: (type, price) => {
        if (type === "+") {
            setTotalPrice(getTotalPrice() + price);
        } else if (type === "-") {
            setTotalPrice(getTotalPrice() - price);
        }
    },

    /* 입금액에서 가격 총액을 뺀 나머지 거스름돈 계산 */
    change: () => {
        setChange(getSlotMoney() - getTotalPrice());
    },

    /* 가격 총액을 총 지불 금액에 합산 */
    totalPayment: () => {
        setTotalPayment(getTotalPayment() + getTotalPrice());
    },

    /* 구입 후 입금액을 잔액으로 변경 */
    remainSlotMoney: () => {
        setSlotMoney(getChange());
    },
};

const stock = {
    /* "재고 계산" */

    /* 선택, 재고, 구매 */
    countAndStock: (type, itemName) => {
        const drink = itemInfo(itemName);
        if (type === "add") {
            // 추가시 선택 개수 ++, 재고 --, 획득 개수 ++
            drink.count++;
            drink.stock--;
        } else if (type === "delete") {
            // 삭제시 선택 개수 --, 재고 ++, 획득 개수 --
            drink.count--;
            drink.stock++;
        }
    },

    /* 아이템 구매 개수 */ ///////////////////////////////////////////////////////////////
    selectCount: () => {
        items.forEach((drink) => {
            if (check.selectCount("count", drink.name)) {
                setSelectCount(drink.name, drink.count + drink.get);
            }
        });
    },
};

/* ===== validation check ===== */
const check = {
    /* "유효성 검사" */

    /* 소지금 확인 */
    wallet: () => {
        const insertMoney = parseInt(insertInput.value);

        if (getWallet() < insertMoney) {
            alert(`소지금 부족! ${wallet}원 남았습니다.`);
            return false;
        }

        return true;
    },

    /* 아이템 재고 확인 */
    stock: (type, itemName) => {
        const drink = itemInfo(itemName);

        if (drink.stock === 0) {
            if (type !== "makeList") {
                alert(`${drink.name}의 재고가 부족합니다.`);
            }
            return false;
        }

        return true;
    },

    /* 입력된 값이 천원 단위인지 확인 */
    slotInsert: (money) => {
        if (money % 1000 !== 0) {
            alert("1,000원 단위로만 입금 가능합니다.");
            return false;
        }

        return true;
    },

    /* 거스름돈이 있는지 확인 */
    change: () => {
        if (getChange() === 0) {
            alert("거스름돈이 없습니다.");
            return false;
        }

        alert(`${getChange()}원이 반환되었습니다.`);
        return true;
    },

    /* 선택된 물건이 있는지 확인 */
    totalCount: (type) => {
        if (type === "get") {
            // 구매할 때 선택된 물건이 있는지 확인
            if (getTotalCount() === 0) {
                alert("선택된 상품이 없습니다.");
                return false;
            }
        } else if (type === "change") {
            // 거스름돈을 반환할 때 선택된 물건이 있는지 확인
            if (getTotalCount() > 0) {
                alert("선택된 상품이 있습니다.");
                return false;
            }
        }

        return true;
    },

    /* 목록에서 추가, 삭제할 아이템 개수 확인 */
    count: (type, itemName) => {
        const drink = itemInfo(itemName);
        if (type === "add") {
            // 같은 종류의 아이템이 있는지 확인
            if (drink.count !== 0) {
                return false;
            }
        } else if (type === "remove") {
            // 같은 종류의 아이템이 없는지 확인
            if (drink.count !== 1) {
                return false;
            }
        }

        return true;
    },

    /* 구매 금액이 충분한지 확인 */
    payment: () => {
        if (getChange() < 0) {
            alert(`${getChange() * -1}원이 부족합니다.`);
            return false;
        }

        return true;
    },

    /* 아이템 구매 개수 확인 */
    selectCount: (type, itemName) => {
        const drink = itemInfo(itemName);
        if (type === "count") {
            // 구매시 선택된 아이템이 있는지 확인
            if (drink.count === 0) {
                return false;
            }
        } else if (type === "get") {
            // 같은 종류의 아이템을 구매했었는지 확인
            if (drink.select !== 0) {
                return false;
            }
        }

        return true;
    },
};

/* ===== reset ===== */
const reset = {
    /* 초기화 */

    /* 거스름돈 초기화 */
    change: () => {
        slotMoney = 0;
        cal.change();
    },

    /* 선택 아이템 개수 초기화 */
    itemsCount: () => {
        items.forEach((drink) => {
            changeItemInfo("count", drink, 0);
        });
    },

    /* 재고 변경에 따른 메뉴 초기화 */
    itemList: () => {
        itemsList.forEach((itemName) => {
            const item = document.querySelector(`.${itemName}`);

            if (itemsStock.get(itemName) == 0) {
                // 재고가 0인 아이템은 soldout 처리
                item.setAttribute("class", `soldout ${itemName}`);
                item.setAttribute("disabled", "");
            }
        });
    },

    /* 가격 총액 초기화 */
    totalPrice: () => {
        totalPrice = 0;
    },

    /* 선택 목록 초기화 */
    selectList: () => {
        selectList.textContent = "";
    },

    /* 선택 총 개수 초기화 */
    totalCount: () => {
        totalCount = 0;
    },
};

/* ===== function ===== */
/* 메뉴 목록 생성 */
const menuList = document.querySelector(".items-list");

function makeMenuList() {
    items.forEach((drink) => {
        const item = document.createElement("li");
        const button = document.createElement("button");

        button.setAttribute("type", "button");
        button.setAttribute("value", `${drink.name}`); // 버튼 클릭 시 가져오기 위한 value
        button.setAttribute("class", `in-stock ${drink.name}`); // instock은 재고 있음, soldout은 재고 없음

        // 첫 목록 생성시 재고 없으면 instock 대신 soldout, disabled로 비활성화
        if (!check.stock("makeList", drink.name)) {
            button.setAttribute("class", `soldout ${drink.name}`);
            button.setAttribute("disabled", "");
        }

        button.insertAdjacentHTML("beforeend", `<img src="images/${drink.code}.png" alt="${drink.name.replace("_", " ")} image" class="item-img">`);
        button.insertAdjacentHTML("beforeend", `<strong class="item-name">${drink.name}</strong>`);
        button.insertAdjacentHTML("beforeend", `<span class="item-price">${drink.cost}원</span>`);

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
        if (check.wallet()) {
            // 입금할 소지금이 남아있는지 확인
            if (check.slotInsert(money)) {
                cal.slotMoney(money); // 입금된 돈을 slotMoney에 합산
                cal.change(); // 입금된 돈에서 선택된 상품의 총액을 뺀 나머지를 계산
                cal.wallet("-", money); // 소지금 차감
                display.change(); // 잔액 표시
                display.myWallet(); // 소지금 표시
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
        if (check.totalCount("change")) {
            if (check.change()) {
                cal.wallet("+", change); // 반환된 거스름돈 소지금에 추가
                reset.change(); // 거스름돈 초기화
                cal.change(); // 거스름돈 계산
                display.myWallet(); // 소지금 표시
                display.change(); // 잔액 표시
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
            const drink = itemInfo(item.value);

            // 재고 확인
            if (check.stock("none", drink.name)) {
                addSelectList(drink.name); // 선택 아이템 목록 추가

                stock.countAndStock("add", drink.name); // 선택 아이템 개수, 재고 계산

                cal.totalPrice("+", drink.cost);
                cal.change(); // 거스름돈 계산
                display.change(); // 잔액 표시
                display.selectItemCount(drink.name); // 같은 종류의 아이템 선택 개수 표시

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
    const drink = itemInfo(itemName);

    if (check.count("add", drink.name)) {
        selectButton.setAttribute("type", "button");
        selectButton.setAttribute("value", `${drink.name}`);

        selectButton.insertAdjacentHTML("beforeend", `<img src="images/${drink.code}.png" alt="${drink.name.replace("_", " ")} image" class="select-img">`);
        selectButton.insertAdjacentHTML("beforeend", `<strong class="item-name">${drink.name}</strong>`);
        selectButton.insertAdjacentHTML("beforeend", `<span class="${drink.name}-count">${drink.count}</span>`);

        selectItem.appendChild(selectButton);
        selectList.appendChild(selectItem);

        /* 목록 아이템 삭제 */
        selectButton.addEventListener("click", () => {
            if (check.count("remove", drink.name)) {
                // 같은 종류의 마지막 아이템이면 목록에서 삭제
                selectList.removeChild(selectItem);
                stock.countAndStock("delete", drink.name);
            } else {
                // 같은 종류의 아이템이 마지막이 아니면 개수만 감소
                stock.countAndStock("delete", drink.name);
                display.selectItemCount(drink.name); // 변경된 아이템 개수 표시
            }
            cal.totalPrice("-", drink.cost); // 선택 아이템 가격을 가격 총액에서 차감
            cal.change(); // 거스름돈 계산
            display.change(); // 잔액 표시

            totalCount--; // 선택된 아이템 총 개수 --
        });
    }
}

/* 구매한 아이템 목록 */
const dispenserList = document.querySelector(".dispenser-list");

function addDispenserList() {
    items.forEach((drink) => {
        // 선택된 아이템이 있는지 확인
        if (!check.count("add", drink.name)) {
            // 이미 구매한 같은 종류의 아이템이 있는지 확인
            if (check.selectCount("count", drink.name)) {
                const getItem = document.createElement("li");
                const getItemButton = document.createElement("button");

                getItemButton.setAttribute("type", "button");
                getItemButton.setAttribute("class", `${drink.name}-get`);
                getItemButton.setAttribute("disabled", "");

                getItemButton.insertAdjacentHTML("beforeend", `<img src="images/${drink.code}.png" alt="${drink.name.replace("_", " ")} image" class="select-img">`);
                getItemButton.insertAdjacentHTML("beforeend", `<strong class="item-name">${drink.name}</strong>`);
                getItemButton.insertAdjacentHTML("beforeend", `<span class="${drink.name}-count">${drink.count}</span>`);

                getItem.appendChild(getItemButton);
                dispenserList.appendChild(getItem);
            } else {
                const itemCount = document.querySelector(`.${drink.name}-get>span`);
                itemCount.textContent = "";
                itemCount.insertAdjacentText("beforeend", `${drink.count + drink.get}`);
            }
        }
    });
}

/* 획득 버튼 이벤트 */
const getItemsButton = document.getElementById("get_button");

function getButton() {
    getItemsButton.addEventListener("click", () => {
        if (check.payment()) {
            if (check.totalCount("get")) {
                cal.totalPayment(); // 구매 총액에 가격 총액 합산

                addDispenserList(); // 구매 목록 생성

                stock.selectCount(); // 아이템별 구매 개수 추가

                reset.itemsCount(); // 선택 아이템 개수 초기화
                cal.remainSlotMoney(); // 거스름돈을 입금액으로 변경
                reset.totalPrice(); // 가격 총액 초기화

                reset.itemList(); // 메뉴 목록 초기화
                reset.selectList(); // 선택 목록 초기화
                reset.totalCount(); // 총 선택 개수 초기화

                display.totalPayment(); // 구매 총액 표시
                display.change(); // 잔액 표시
            }
        }
    });
}

getButton();
