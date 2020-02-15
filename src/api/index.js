import {fetchPost, fetchGet } from '../axiosConfig/index'
import axios from "axios";

let url = '';
if (process.env.NODE_ENV === 'production') {
  url = window.location.host;
} else if (process.env.NODE_ENV === 'development') {
  url = '/api'
}

// 查询新闻
export function newShowQry(data) {
  return fetchGet(url + `/znwy/new/newShowQry?` + data).then(
    res => {
      return Promise.resolve(res);
    },
    err => {
      return Promise.reject(err);
    }
  );
}


// 删除新闻
export function newDel(data) {
  return axios.delete(url + "/znwy/new/newDel?" + data).then(
    res => {
      return Promise.resolve(res);
    },
    err => {
      return Promise.reject(err);
    }
  );
}


// 添加新闻
export function addNews(data) {
  return fetchPost(url + "/znwy/new/newAdd", data).then(
    res => {
      return Promise.resolve(res);
    },
    err => {
      return Promise.reject(err);
    }
  );
}

// 修改新闻
export function updateNews(data) {
  return fetchPost(url + "/znwy/new/newUpdate", data).then(
    res => {
      return Promise.resolve(res);
    },
    err => {
      return Promise.reject(err);
    }
  );
}

// 文件上传
export const upLoadUrl = url + "/znwy/sysFile/upload";

// 文件删除
export function deleteFile(data) {
  return axios.delete(url + "/znwy/sysFile/delFile?" + data).then(
    res => {
      return Promise.resolve(res);
    },
    err => {
      return Promise.reject(err);
    }
  );
}

// 登录
export function loginUser(data) {
  return fetchPost(url + "/znwy/login", data).then(
    res => {
      return Promise.resolve(res);
    },
    err => {
      return Promise.reject(err);
    }
  );
}

