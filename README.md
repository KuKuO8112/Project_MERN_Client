# 記帳網站 client 前端  
此專案為使用 MERN 製作的簡易記帳網站的前端 client 部分，MERN 即為 React、node.js、Express、mongoDB，使用 React 作為 client 前端框架，並部署至 github Pages。  

## 使用套件
1. gh-pages：部署至 github Pages 所使用的套件。  
  
2. axios：取得 AxiosResponseObject，內部 data 可直接使用。  
  
3. MaterialUI：MUI 的各種套件，製作月曆頁面 Date Calendar，並選取日期以取得當日資料。  
  
4. dayjs：配合 MUI 的 Date Calendar，取得時間資料。  
  
5. React：基本的 react、react-dom、react-router-dom等等。  
  
## 基本功能
進入到首頁時會寄送測試 request 至後端，以便提早喚醒後端render伺服器。  
  
上方 Nav 於是否登入將顯示不同內容，能切換至不同 route。  
  
若前次使用時未登出，瀏覽器的 localStorage 會保有前次使用時後端 JSON Web Tokens 寄送過來的 token，不用再次登入。  
  
註冊時，將名稱、信箱和密碼傳送 post 給後端建立資料，並導向登入頁面。  
  
登入時，將信箱及密碼傳送 post 給後端驗證資料，並得到 JSON Web Tokens 製作的 token，並存入 localStorage，之後導向個人頁面。  
  
新增資料時，將所輸入的資料傳送 post 至後端並驗證資料類型及格式，成功時將導向記帳資料列表頁面。  
  
剛開啟資料列表頁面時，將 id 和 localStorage 內的 token 傳送 get 至後端以取得資料。  
  
資料列表頁面能夠依據收入或支出、來源及用途、金額、日期範圍去對資料做篩選，並設置刪除及修改資料的按鈕。  
  
修改資料時，將修改後的資料及 token 傳送 patch 至後端，一樣驗證資料類型及格式，並做修改。  
  
刪除資料時，將欲刪除的資料 id 及 token 傳送 delete 至後端，刪除資料後再重新取得一次資料。  
  
開啟月曆頁面時， 將 id 和 token 傳送 get 至後端取得資料。  
  
月曆上方為 MUI 製作的 Date Calendar， 選擇日期並於下方顯示該日期的資料。
  
登出，刪除 localStorage 內的 token。
