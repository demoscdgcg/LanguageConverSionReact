/**
 * 计算文件大小，返回MB
 * @param {*} size  file 文件中的size
 */
export function getFileSize(size) {
  var fileSizeInMB = size / (1024 * 1024);
  return fileSizeInMB.toFixed(2); // 返回两位小数的结果
}
/**
 * 判断是否为超级管理员
 * @param {*} setHideButton
 */
export const checkUserRole = (setHideButton) => {
  setTimeout(() => {
    // const userID = JSON.parse(localStorage.getItem("USER_INFO"));

    const storedData = localStorage.getItem("USER_INFO");

    // 判断数据是否存在
    if (storedData) {
      const userData = JSON.parse(storedData);
      if (userData.roleCode === "SUPER_ADMIN") {
        setHideButton(true);
      } else {
        setHideButton(false);
      }
    }
  }, 2000);
};

/**
 * 禁止选择当天日期
 * @param {*} date
 * @returns
 */
export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 *
 * @param {判断对象是否为空} obj
 * @returns
 */

export const isObjectEmpty = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const dateFormat = (date, fmt) => {
  if (fmt === undefined || fmt === null) {
    fmt = "yyyy-MM-dd HH:mm:ss";
  }
  if (date === "" || date === undefined || date === null) {
    return "";
  }
  if (typeof date === "number") {
    date = new Date(date);
  }

  var o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  var week = {
    0: "/u65e5",
    1: "/u4e00",
    2: "/u4e8c",
    3: "/u4e09",
    4: "/u56db",
    5: "/u4e94",
    6: "/u516d",
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? "/u661f/u671f"
          : "/u5468"
        : "") + week[this.getDay() + ""]
    );
  }
  for (var k in o) {
    let rg = "(" + k + ")";
    if (new RegExp(rg).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

export const bytesToSize = (bytes) => {
  if (bytes === 0) return "0 B";
  var k = 1024, // or 1000
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
};

export const deepObjectMerge = (target, ...objects) => {
  target = target || {};
  let len = objects.length;
  for (let i = 0; i < len; i++) {
    let SecondOBJ = objects[i];
    for (var key in SecondOBJ) {
      target[key] =
        target[key] && target[key].toString() === "[object Object]"
          ? deepObjectMerge(target[key], SecondOBJ[key])
          : (target[key] = SecondOBJ[key]);
    }
  }
  return target;
};

export const getQueryString = (name) => {
  var reg = new RegExp("(^|&|)" + name + "=([^&]*)(&|$)");
  var url =
    window.location.hash.substr(1) ||
    window.location.search ||
    window.location.href;
  var r = url.match(reg);
  if (r !== null) {
    return unescape(r[2]);
  } else {
    url = window.location.search || window.location.href;
    r = url.match(reg);
    if (r !== null) {
      return unescape(r[2]);
    }
  }
  return null;
};

export const getLanguage = () => {
  let lang = localStorage.getItem("language");
  if (!lang) {
    lang = navigator.language || "zh_cn";
  }
  if (lang === "en" || lang === "en-US" || lang === "en-GB") {
    lang = "en";
  } else if (
    lang === "zh_cn" ||
    lang === "zh-cn" ||
    lang === "zh-CN" ||
    lang === "zh" ||
    lang === "zh-TW"
  ) {
    lang = "zh_cn";
  } else {
    lang = "zh_cn";
  }
  let langs = getQueryString("language");
  return langs || lang;
};

export const formatDateFromString = (dateString) => {
  // 将时间字符串解析为日期对象
  const dateObj = new Date(dateString);

  // 从日期对象中获取年、月、日
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1；并确保两位数格式
  const day = String(dateObj.getDate()).padStart(2, "0"); // 日需要确保两位数格式

  // 构建目标格式的日期字符串
  const formattedDate = `${year}-${month}-${day}`;

  // 返回格式化后的日期字符串
  return formattedDate;
};

// 图片懒加载方法
const lazyImage = () => {
  let observer = new IntersectionObserver(function (entries) {}); // 这个对象可以监听 视口 和元素 是否重叠   异步的
};
