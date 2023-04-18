import axios from "axios";
const API_URL = "https://project-mern-server.onrender.com/api/account";

class AccountService {
  post(title, IncomeOrPay, description, cost, date, time) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      {
        title,
        IncomeOrPay,
        description,
        cost,
        date,
        time,
      },
      {
        headers: {
          //在headers設定token
          Authorization: token,
        },
      }
    );
  }
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/account/" + _id, {
      headers: {
        //在headers設定token
        Authorization: token,
      },
    });
  }

  patch(_id, title, IncomeOrPay, description, cost, date, time) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "/" + _id,
      { title, IncomeOrPay, description, cost, date, time },
      {
        headers: {
          //在headers設定token
          Authorization: token,
        },
      }
    );
  }

  delete(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/" + _id, {
      headers: {
        //在headers設定token
        Authorization: token,
      },
    });
  }
}

export default new AccountService();
