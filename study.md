# 자바스크립트 밴딩머신

## let, const

```
// 한 블럭 안에서 변할 가능성이 있는 경우(입금액, 잔액, 총액 등)
let 변동가능성있는 = 0;
// 한 블럭 안에서 변할 가능성이 없는 경우(요소, Map 등)
const 변동가능성이없는 = 0;

```

---

## Document 요소 불러오기

```
document.querySelector(); // 제일 첫 요소 1개만 반환
document.querySelectorAll(); // 모두 찾은 후 제일 첫번쨰 요소 반환
```

```
// 첫번째 요소만 반환하지만 종료되지 않고 컬렉션으로 모든 해당 요소 보유
const elements = document.querySelectorAll("선택자");

// 하나씩 불러오기
const firstElement = elements[0];
const lastElement = elements[element.length - 1];

// 순회하기
elements.forEach((element), => {
    consoel.log(element);
})

// 반복문
for (let i = 0; i < elements.length; i++) {
    console.log(elements[i]);
}
```

-   클래스 : `".class"`
-   아이디 : `"#id"`
-   태그명 : `"tag"`
-   선택자 : `".selector1>.selector2 .selector3[type='타입']"`

```
document.getElementById();
```

-   id : `"elementId"`

```
document.getElementsByTagName();
```

-   name : `"elementTagName"`

---

## for, forEach()

```
// 원하는 횟수만큼 반복
for (let i = 0; i < 횟수; i++) {
    // 실행 코드
}
```

```
// 요소 전부 순회
array.forEach((element) => {
    // 실행 코드
})
```

---

## if, else if, else

```
// 조건이 하나뿐일 때는 return으로 빠져나갈 수 있음
function check() {
    if (true) {
        return true;
    }

    return false;
}
```

```
// 조건이 여러개일 땐 else if를 사용해서 조건을 최대한 명확하게 표시
function check() {
    if (조건 1) {
        return true;
    }
    return false;
    // 보다는

    if (조건 1) {
        return true;
    } else if (조건 2) {
        return false;
    }
    return false;
    // 명확한 조건
}
```

---

## 요소 만들기, 자식 요소 추가하기, 요소에 속성 추가하기

```
// 부모요소 불러오기
const parentElement = document.querySelector('ul')

// 자식요소 만들기
const childElement = document.createElement("li")

// 자식요소 속성 추가
childElement.setAttribute("속성명", "속성값");
// 속성값 없는 속성 추가시 속성명을 비워두면 됨 (ex. disabled)
childElement.setAttribute("속성명", "");

// 부모요소에 자식요소 추가
parentElement.appendChild(childElement);
```

---

## insertAdjacentHTML, insertAdjacentText

### 변경이 아니라 추가

```
const parentElement = document.querySelector("선택자");
parentElement.insertAdjacentHTML("삽입 위치", "삽입할 요소")
parentElement.insertAdjacentText("삽입 위치", "삽입할 요소")

```

-   삽입 위치(parentElement 기준)
    -   afterbegin, beforeend : 첫번째 자식, 마지막 자식
    -   beforebegin, afterend : 요소 앞, 요소 뒤 (형제)
-   삽입할 요소
    -   `"<childElement>content</childElement>"`

---

## textContent

### 텍스트 추가, 삭제

```
<span> 텍스트 </span>

const spanTag = document.querySelect("span").textContent;
console.log(spanTag) // 텍스트
spanTag.textContent = ""; // 내용 삭제
spanTag.textContent = "트스텍" // 내용 변경
```

---

## addEventListener()

### 요소별 여러 상호작용 가능

```
button.addEventListener("click", () => {
    클릭시 실행할 코드
})

checkbox.addEventListener("change", () => {
    상태 변환시 실행할 코드
})
```

## Map, Object

-   [왜 Map?](https://shanepark.tistory.com/220)
-   [Map, Object 차이](https://velog.io/@namda-on/JavaScript-Map-%EA%B3%BC-Object-%EC%9D%98-%EC%B0%A8%EC%9D%B4)

```
const newMap = new Map([
    ["key1", "value1"],
    ["key2", "value2"],
])

newMap.get("key1") // value1
newMap.set("key2", "value3")
newMap.get("key2") // value3
```

```
const newObject = {
    "key1" : "value1",
    "key2" : "value2"
}

newObject.key1 // value1
newObject[key2] = value3;
```

---

## `｀${}｀`

### 유동적인 값을 넣을 수 있음

```
for (let i = 0; i < 10; i++) {
    console.log(i + "는 " + (i + 1) + "보다 작다.");
    console.log(`${i}는 ${i + 1}보다 작다.`);
}

```

---

## 상향식 설계

1. 작은 기능을 먼저 만든다.
    - 입금, 거스름돈, 계산, 리셋 등 더 나눌 수 없는 단계의 기능 모듈화
2. 작은 기능들을 결합해서 큰 기능을 만든다.
    - 모듈화된 기능을 모아 상품 선택, 구매 등에 결합하여 사용

---

## 예외처리

1. 기능을 만들 때 어떤 상황에서 예외(오류)가 발생할지 예측
2. 조건문을 사용해 해당 상황이 닥쳤을 때 비껴갈수 있도록(경고창 등)

-   예
    -   입금 버튼 누를 때 입금할 돈이 있는가?
    -   구매 금액이 모자라지 않은가?
    -   거스름돈이 있는가?
