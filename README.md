# ❤️‍🩹 GOODSENDING
> 더 이상 필요 없는 굿즈들을 실시간 경매를 통해 구매, 판매 할 수 있는 서비스 플랫폼

🔗 [굿즈엔딩 소개 브로셔](https://www.notion.so/8528ca6a974e4795ba2ea971cbe62f53?pvs=4)


## 📌 프로젝트 소개

📅 프로젝트 기간 : 2024.07.19 ~ 2024.08.16

![굿즈엔딩 목업](https://github.com/user-attachments/assets/e19980ec-61bb-4ec6-952b-fef4573ba56f)

🧸 판매하고 싶은 상품을 경매에 등록해보세요!
<br/>
💸 실시간으로 경매에 참여하여 원하는 물건을 구매해보세요!
<br/>
⌨️ 경매 참여한 유저들과 채팅으로 소통해보아요!

**GoodsEnding**은 더 이상 필요 없어진 굿즈를 실시간 경매를 통해 구매하고 판매할 수 있는 플랫폼입니다. 사용자는 간편하게 상품을 등록하고, 다른 사용자와 실시간 채팅으로 소통하며 경매에 참여할 수 있습니다.

🔗 [GOODSENDING-FE GITHUB](https://github.com/goods-ending/goodsending-fe)

🔗 [팀 프로젝트 노션](https://nervous-mule-411.notion.site/GoodsEnding-51dccf65d0b843639f070db0a3866105?pvs=4)

🔗 [시연 영상](https://www.youtube.com/watch?v=0cbSPnoaRMQ)




### 🧬 프로젝트 아키텍처
![아키텍처](https://github.com/user-attachments/assets/6941d249-e189-4dd4-b6ee-c2ad8b725aa9)

---


### 💡 주요 기능 소개
<details>
<summary>👥 [사용자] 회원 가입</summary>
<div markdown="1">
<h4>💡 실제 해당 메일 계정의 소유 여부를 검증하기 위해 인증코드를 발급하고 확인</h4>
<img src="https://github.com/user-attachments/assets/0077c91b-90f5-4e8e-955a-36be9010dded" width="80%">
</div>
</details>

<details>
<summary>🔐 [사용자] 로그인 / 로그아웃</summary>
<div markdown="1">
<h4>💡 Security를 적용하여, 인증 시 Access Token과 Refresh Token 발급</h4>
<img src="https://github.com/user-attachments/assets/4bb57c80-5e3f-4d0b-8f93-7ba20268285d" >
<ul>
<li>1️⃣ 사용자 정보를 통한 JWT 토큰을 발급하는 방식으로 구현</li>
</ul>
</div>
</details>

<details>
<summary>🪪 [사용자] 마이페이지</summary>
<div markdown="1">
<h4>💡 로그인 한 회원은 자신이 보유한 캐시 와 포인트를 확인 할 수 있고, 비밀번호 변경 및 캐시 충전 가능</h4>
<img src="https://github.com/user-attachments/assets/2957af92-1f95-428c-9186-a98f397e8238" >
</div>
</details>

<details>
<summary>💰 캐시 및 포인트</summary>
<div markdown="1">
<h4>💡 서비스 수익화 및 관리를 위한 캐시 및 포인트 서비스</h4>
<img src="https://github.com/user-attachments/assets/2fbcbced-af76-4c10-87b2-e03ab4b856c0" >
<ul>
<li>1️⃣ 보증금 회수 및 환불</li>
<p>- 무분별한 상품 등록을 막고자 보증금 서비스 도입</p>
<p>- 상품을 등록시 판매자의 캐시에서 보증금 지불</p>
<p>- 보증금 금액: 경매 최소 가격의 5%(최소 3000원)</p>
<p>- 무분별한 상품 등록을 막고자 보증금 서비스 도입</p>
</ul>
</div>
</details>

<details>
<summary>🏷️ [상품] 상품 판매 등록</summary>
<div markdown="1">
<h4>💡 상품 판매를 위한 등록</h4>
<img src="https://github.com/user-attachments/assets/11bd9b3c-78a4-4cc8-8aec-f0d824cdb5eb" width="80%">
<ul>
<li>1️⃣ 경매를 위한 상품 등록</li>
<p>- 10mb 이하의 이미지만 업로드 가능</p>
<p>- 사진은 최대 5장까지 등록 가능</p>
<p>- 상품 등록에 대한 기준점을 익일로 잡고, 경매 시작 날짜를 등록한 날 익일부터 등록 가능</p>
</ul>
</div>
</details>

<details>
<summary>📋 [주문] 낙찰된 주문 관리</summary>
<div markdown="1">
<h4>💡 낙찰된 주문 관리[배송지 정보 입력 ➡️ 배송 처리 ➡️ 거래 확정]</h4>
<img src="https://github.com/user-attachments/assets/3d2688a1-527b-44d4-b159-c32f47854aa4" width="80%">
<ul>
<p>구현한 기능</p>
<li>1️⃣ 낙찰자의 배송받을 배송지주소, 연락처, 수신자명 업데이트</li>
<li>2️⃣ 판매자의 배송지가 입력된 주문 배송처리</li>
<li>3️⃣ 낙찰자의 배송받은 주문 확정</li>
<p>- 판매자에게 보증금을 환불하고 수수료를 제외한 수익을 캐시로 입금</p>
</ul>
</div>
</details>

<details>
<summary>✨ [주문] 낙찰자 선정 및 주문 진행</summary>
<div markdown="1">
<h4>💡 5분동안 추가 입찰이 없을 경우 낙찰자가 선정되어 주문 진행</h4>
<img src="https://github.com/user-attachments/assets/c4dffb95-cb9a-4567-9045-3fec229542fd">
</div>
</details>
  
<details>
<summary>📊 [인기 순위] 경매 상품 인기 순위</summary>
<div markdown="1">
<h4>💡 경매 상품의 인기 순위를 입찰자와 좋아요 수를 기준으로 조회. 경매 시간대에는 입찰자, 경매 시간대가 아닌 경우 좋아요 수를 기준으로 인기 순위를 조회</h4>
<img src="https://github.com/user-attachments/assets/da1a706e-653e-4d62-ae55-d9895f94c2f9">
</div>
</details>

<details>
<summary>💬 [채팅] 실시간 경매 상품 채팅</summary>
<div markdown="1">
<h4>💡 실시간 상품에 대한 채팅 참여 및 입찰,낙찰 내역을 확인</h4>
<img src="https://github.com/user-attachments/assets/667d28a4-3352-4924-8774-a099ded34068" >
<ul>
<li>1️⃣ Web Socket</li>
<p>- 실시간 양방향 데이터 송수신을 위한 웹소켓 활용</p>
<p>- 커스텀 핸들러를 사용하여 SEND 시 유저를 식별</p>
<li>2️⃣ STOMP</li>
<p>- WebSocket에 대한 불필요한 구현을 줄여, 명확하고 쉽게 구현</p>
</div>
</details>

<details>
<summary>❤️ [경매 상품] 찜</summary>
<div markdown="1">
<h4>💡 서비스 수익화 및 관리를 위한 캐시 및 포인트 서비스</h4>
<img src="https://github.com/user-attachments/assets/b1696f09-ac2a-4b64-b15f-30b3069c29ca" width="70%">
<img src="https://github.com/user-attachments/assets/92f23e5a-23ab-4353-b846-e81963a4f8bf" width="70%">
</div>
</details>

<details>
   
<summary>🔍 [경매 상품] 검색 및 필터링 기능</summary>

<div markdown="1">
<h4>💡 사용자가 경매 상품을 검색할 때, 원하는 상품에 쉽고 빠르게 접근할 수 있는 검색 기능</h4>
<img src="https://github.com/user-attachments/assets/553b6e89-39da-4fc8-9fea-1f3b2708cf04" width="80%">
<img src="https://github.com/user-attachments/assets/d730e54a-aca5-4ce9-86dd-3de72c8646d2" width="80%">
</div>

</details>

---
### 🧙 기술적 의사결정
- `Yarn` - Yarn은 패키지 관리 도구로, 패키지를 설치할 때 캐시를 사용하여 이전에 다운로드한 패키지를 재사용하므로 설치 속도가 빠르고, 대규모 프로젝트에 효율적입니다.  `yarn.lock` 파일을 생성하여 의존성의 정확한 버전을 기록하기에 팀원 간의 환경 차이를 줄이고, 일관된 빌드를 보장하며 오류 발생 시 명확하고 구체적인 메시지를 제공하여 문제 해결을 용이하게 해준다는 장점이 있어 패키지 관리 도구로 Yarn을 사용했습니다.
- `tailwind CSS` - tailwind CSS는 미리 정의된 유틸리티 클래스를 사용하여 빠르게 스타일을 적용할 수 있기에 스타일링에 소요되는 시간을 크레 줄일 수 있다는 장점이 있습니다. 설정 파일을 통해 쉽게 커스터마이즈 할 수 있고 모든 스타일이 클래스 형태로 정의되어 팀원간의 스타일링 차이를 최소화할 수 있다는 장점이 있습니다.
- `shadcn/ui` - tailwind CSS로 스타일링을 진행하면서 일관성 있는 UI 컴포넌트를 빠르게 구성해야 했습니다. 기존의 tailwind UI는 커스터마이징이 많이 필요했고, UI 컴포넌트를 직접 작성해야 하는 경우가 많았습니다. 반면, shadcn/ui는 tailwind CSS와 호환성이 높아 별도의 컴포넌트 작성 없이도 요구사항을 충족할 수 있었으며, 개발 시간을 절약할 수 있었습니다.
- `Axios` - API 요청과 응답 처리에서 발생 가능한 오류를 체계적으로 관리해야 했고, 인증 토큰 재발급이 필요했습니다. Axios의 interceptor 기능은 요청과 응답을 가로채 필요한 로직을 추가할 수 있어 이러한 요구사항을 쉽게 구현할 수 있었습니다.
- `Redux` - 프로젝트는 다수의 컴포넌트 간 상태 공유와 비동기 데이터 처리가 중요한 요구사항이었습니다. Redux를 선택한 이유는 중앙 집중식 상태 관리 덕분에 상태 변화를 예측 가능하게 관리할 수 있었기 때문입니다.

### 🔨 기술 스택


#### **Frontend**
- Language : JavaScript (ES6)
- Framework : React
- State Management : Redux
- Build Tool : AWS Amplify
- Package Manager : yarn
- UI Library : Tailwind CSS
- HTTP Client : Axios
- Formatting : Prettier
- Version Control : Git

#### **CI / CD**

- Deploy
    - AWS EC2
    - Docker
    - Github Actions
    - AWS ECR
- Communication
    - Slack
    - Github
    - Notion

---

### 🧨 트러블 슈팅


<details>  

<summary>🧨 웹소켓 채팅 기능에서 한글 입력 후 엔터 시 두 번 전송되는 문제</summary>
 
<div markdown="1">

<h4>❓문제 상황 </h4>

<p>웹소켓을 이용한 채팅 기능에서, 한글 입력 후 onkeydown 이벤트로 엔터를 입력할 때 동일한 메시지가 두 번 전송되는 문제가 발생</p>

<p>이로 인해 채팅 메시지가 중복 전송되어 사용자 경험에 부정적인 영향을 미쳤음</p>

<ul>

<li>원인</li>

<p>- 한글 입력 시 IME(입력기)가 활성화되며, 글자가 조합 중일 때와 조합이 완료된 후에 각각 이벤트가 발생하는 경우가 있음</p>

<p>- onkeydown 이벤트가 두 번 발생해 동일한 메시지가 중복으로 전송되는 현상이 발생</p>

<li>해결 방법</li>

<p>- 과거에는 이 문제를 해결하기 위해 onKeyPress 이벤트를 사용할 수 있었지만, keypress 이벤트는 더 이상 권장되지 않음. MDN 문서에서도 keypress 이벤트가 표준에서 제외될 가능성이 있음을 경고하고 있음</p>

<p>- onkeydown 이벤트를 그대로 사용하면서, IME 입력 중인지 여부를 감지하기 위해 KeyboardEvent.isComposing 속성을 활용</p>

<p>isComposing 속성은 조합 문자를 작성할 때 true를 반환하므로, 이를 통해 한글 입력 중일 때 이벤트 처리를 막고, 조합이 완료된 후에만 메시지를 전송하도록 수정</p>

<p>또한, 영어 입력 시에는 조합 문자가 없으므로, 중복 이벤트 문제가 발생하지 않음</p>

<details>

<summary>관련 코드</summary>

```jsx

const handleKeyDown = (e) => {
// Enter 키를 누르고, altKey가 활성화되지 않았으며, IME 조합이 완료된 상태에서만 메시지 전송
	if (e.key === "Enter" && !e.altKey && e.nativeEvent.isComposing === false) {
		e.preventDefault();
		sendMessage();
		}
	};

```

</details>
 
</ul>
 
</div>
 
</details>

<details>

<summary>🧨 소켓 메시지 전달 시 토큰 만료 확인 문제</summary>

<div markdown="1">

<h4>❓문제 상황 </h4>

<p>소켓 메시지를 전달할 때 클라이언트에서 토큰값을 활용하여 사용자 인증을 수행했으나, 토큰 만료 여부를 실시간으로 확인하지 못하는 문제가 발생</p>

<p>토큰이 만료된 상태에서도 메시지가 전송되어 메세지가 전송이 되지않거나, 인증되지 않은 사용자가 접근할 가능성이 생김</p>

<ul>

<li>원인</li>

<p>- 소켓 통신 자체에서는 토큰 만료 여부를 바로 확인할 수 없기 때문에, 만료된 토큰으로도 메시지가 전송되는 상황이 발생</p>

<p>- 서버로부터 토큰의 유효성을 검증받지 않고 메시지를 보내는 구조였기 때문에 발생한 문제</p>

<li>해결 방법</li>

<p>- 소켓 메시지를 전송하기 전에 토큰의 유효성을 확인하는 API를 호출하여, 유효한 토큰일 때만 소켓 메시지를 전송하도록 로직을 수정</p>

<p>- 토큰 검증 API를 호출한 후, 검증에 성공하면 메시지를 전송하고, 실패하면 재로그인 또는 에러 처리를 진행</p>

<details>

<summary>관련 코드</summary>

```jsx
const handleSendMessage = (chatMessage) => {
	if (tokenCheck()) { // 토큰 검증 API 호출 ( true , false 반환 )
		if (
			client &&
			connectionStatus === "CONNECTED" &&
			chatMessage.trim() !== ""
		) {
		client.publish({
			destination: `/app/message`,
			body: JSON.stringify({
				productId: productInfo.productId,
				message: chatMessage,
				type: "GENERAL_CHAT",
			}),
			headers: {
				Access_Token: `Bearer ${token}`,
			},
		});
	}
} else {
	alert("잠시 후 다시요청하세요.");
	}
};
```

</details>

<p>이를 통해 만료된 토큰으로 소켓 메시지가 전송되는 문제를 해결하고, 보안성을 강화할 수 있었음</p>

</ul>

</div>

</details>



<details>

<summary>🧨 Redux 유저정보 새로고침 시 데이터 소실 문제</summary>

<div markdown="1">

<h4>❓문제 상황 </h4>

<p>Redux를 통해 관리하는 유저 정보가 페이지를 새로고침할 때마다 초기화되는 문제가 발생</p>

<p>유저 상태를 유지해야 하는데 새로고침할 때마다 정보가 날아가서 불편한 상황이 발생함</p>

<ul>

<li>원인</li>

<p>- Redux는 상태 관리를 위해 사용하는 라이브러리지만, 상태는 메모리에 저장되기 때문에 페이지 새로고침 시 메모리가 초기화되어 Redux 상태도 함께 사라짐</p>

<p>- 이로 인해 Redux로 관리 중이던 유저 정보가 새로고침 시 유지되지 않고 초기화되는 현상이 발생</p>

<li>해결 방법</li>

<p>- 이 문제를 해결하기 위해 redux-persist 라이브러리를 적용함. redux-persist는 Redux 상태를 로컬 스토리지 또는 세션 스토리지에 저장하여 페이지 새로고침 시에도 상태가

유지되도록 도와줌</p>

<p>- 아래와 같이 redux-persist를 적용하여 Redux 상태를 로컬 스토리지에 저장하도록 설정</p>

<details>

<summary>관련 코드</summary>

```jsx

import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { createStore } from "redux";

import rootReducer from "./reducers"; // root reducer import

  

const persistConfig = {

key: "root",

storage,

};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);

```

</details>

  

<p>이제 유저 정보가 Redux에 저장되면, 새로고침 후에도 로컬 스토리지에서 해당 정보가 복구되어 상태가 유지됨</p>

<p>추가 조치: 로그아웃 시에는 persist 데이터를 삭제하여, 유저 데이터가 브라우저에 남아있지 않도록 함. 이는 보안적으로 민감한 유저 정보가 로그아웃 이후에도 남아있는 것을 방지함</p>

  

<details>

<summary>관련 코드</summary>

```jsx

const handleLogout = () => {

persistor.purge(); // 로그아웃 시 저장된 상태 삭제

// 기타 로그아웃 처리 로직...

};

  

```

</details>

  

</ul>

</div>

</details>

<details>

<summary>🧨 폼 데이터와 멀티파트 데이터 문제</summary>

<div markdown="1">

<h4>❓문제 상황 </h4>

<span>폼 데이터 전송 시 멀티파트 데이터로 전송해야 할 파일이 올바르게 처리 되지 않음</span>

<p>에러 메시지 400 Bad Request, 415 Unsuppoted Media Type 등</p>

<p>파일과 폼 데이터가 정상적으로 서버에 전송되어야 하는데 파일 업로드 실패 발생</p>

<ul>

<li>원인</li>

<p>- 폼 데이터 : 일반적으로 텍스트 필드만 포함, application/json 형식으로 전송</p>

<p>- 멀티파트 데이터: 파일 업로드를 포함, multipart/form-data 형식으로 전송</p>

<p>- 잘못된 enctype 설정으로 인해 파일 선택 및 전송 과정에서 오류 발생</p>

<li>해결 방법</li>

<p>- 폼 설정 확인 후 형식 변경</p>

<p>- 파일 크기 제한 확인 : 서버에서 설정한 최대 파일 크기 초과하는 지 확인</p>

<p>- 브라우저 콘솔 로그 확인 : 네트워크 요청 및 응답을 확인하여 오류 메시지 검토</p>

</ul>

</div>

</details>



---
### 👨🏻‍💻👩🏻‍💻 팀원 구성
 
|     | 이름               | 분담                                                                              | GitHub                                                                              |
| --- | ---------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| FE  | 류진식(Vice Leader) | 로그인, 회원가입, websoket을 활용한 실시간 채팅, 상품 조회, 검색, 상세내역 보기, 경매 등록 상품 관리                | [https://github.com/ryujinsik](https://github.com/ryujinsik)                        |
| FE  | 정은주              | 상품 등록기능, 회원정보 조회, 캐시 충전, 비밀번호 변경, 마이페이지                                         | [https://github.com/25809637410](https://github.com/25809637410)                    |
| BE  | 박지은(Leader)      | CI/CD, 입찰, 낙찰, 주문 기능, Web실시간 채팅                                                 | [https://github.com/je-pa](https://github.com/je-pa)                                |
| BE  | 김채린              | 경매 상품 CRUD, 경매 상품 목록 필터링 조회, Scheduler를 사용한 경매 상품 상태 변경, 입찰자 기준 상품 인기순위 Top5 조회 | [https://github.com/puclpu](https://github.com/puclpu)                              |
| BE  | 배근우              | 찜 하기, 찜 취소, 찜 리스트, 찜 인기순위 Top5                                                  | [https://github.com/zz6331300zz](https://github.com/zz6331300zz)                    |
| BE  | 이아람              | 로그인, 회원가입, 토큰 관리, 캐시 충전, 회원정보 조회                                                | [https://github.com/ramleeramlee](https://github.com/ramleeramlee?tab=repositories) |
