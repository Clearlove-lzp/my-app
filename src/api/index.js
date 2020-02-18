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

// 新闻详情
export function newInfo(data) {
  return fetchGet(url + `/znwy/new/newInfo?` + data).then(
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

// 根据id查询文件
export function fileDetail(data) {
  return fetchGet(url + "/znwy/sysFile/ids?" + data).then(
    res => {
      return Promise.resolve(res);
    },
    err => {
      return Promise.reject(err);
    }
  );
}

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


// 查询产品
export function caseShowQry(data) {
  return fetchGet(url + `/znwy/case/caseShowQry?` + data).then(
    res => {
      return Promise.resolve(res);
    },
    err => {
      return Promise.reject(err);
    }
  );
}


// 添加产品
export function caseAdd(data) {
  return fetchPost(url + "/znwy/case/caseAdd", data).then(
    res => {
      return Promise.resolve(res);
    },
    err => {
      return Promise.reject(err);
    }
  );
}


// 修改产品
export function caseUpdate(data) {
  return fetchPost(url + "/znwy/case/caseUpdate", data).then(
    res => {
      return Promise.resolve(res);
    },
    err => {
      return Promise.reject(err);
    }
  );
}

// 删除新闻
export function caseDel(data) {
  return axios.delete(url + "/znwy/case/caseDel?" + data).then(
    res => {
      return Promise.resolve(res);
    },
    err => {
      return Promise.reject(err);
    }
  );
}


// 产品详情
export function caseInfo(data) {
  return fetchGet(url + `/znwy/case/caseInfo?` + data).then(
    res => {
      return Promise.resolve(res);
    },
    err => {
      return Promise.reject(err);
    }
  );
}
