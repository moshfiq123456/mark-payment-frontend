import sanitizeHtml from 'xss';

export const escapeStr = (str) => sanitizeHtml(str, {});

export const performResponseData = (data) => {
  if (!data) {
    return data;
  }

  if (typeof data === 'string') {
    return escapeStr(data);
  }

  if (Array.isArray(data)) {
    return data?.map((item) => performResponseData(item));
  }

  if (typeof data === 'object') {
    let res = {};

    Object.keys(data)?.forEach((key) => {
      res = { ...res, [key]: performResponseData(data[key]) };
    });

    return res;
  }

  return data;
};