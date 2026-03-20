import { useCookies } from '@vueuse/integrations/useCookies';

const cookies = useCookies();

export const LOGIN_TOKEN = 'token';

export const setCookie = (key, value) => {
  cookies.set(key, value);
}

export const getCookie = (key) => {
  return cookies.get(key);
}

export const delCookie = (key) => {
  cookies.remove(key);
}
