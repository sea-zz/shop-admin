export const LOCAL_STORAGE = {
  'SHOP_ADMIN_TABS': 'shop_admin_tabs'
};

export const setStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const getStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
}

