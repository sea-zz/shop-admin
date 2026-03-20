import store from "../store";

const hasPermission = (val, el = false) => {
  if (!Array.isArray(val)) {
    throw new Error(`权限格式错误，参考示例：v-permission="['getStatistics3, GET']"`);
  }

  const hasPer = val.find(item => store.state.user.ruleNames.includes(item));
  if (el && !hasPer) {
    el.parentNode && el.parentNode.removeChild(el);
  }

  return !!hasPer;
}

export default {
  install(app) {
    app.directive('permission', {
      mounted(el, data) {
        hasPermission(data.value, el);
      }
    });
  }
}
