import request from "../utils/request";

export const getUserInfo = (data) => {
  return request({
    url: "/user/list",
    method: "get",
    params: data,
  });
};

export const deleteList = (data) => {
  return request({
    url: "/user/delete",
    method: "post",
    data: data,
  });
};

export const update = (data) => {
  return request({
    url: "/user/update",
    method: "post",
    data: data,
  });
};

export const upload = (data) => {
  return request({
    url: "user/uploadfile",
    method: "post",
    data: data,
    headers: {
      "Content-Type":"multipart/form-data"
    }
  });
};

