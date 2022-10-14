import Vue, { createSSRApp } from 'vue';
import App from './App.vue';
import bootstrap, { BootstrapVueIcons } from '@ankurk91/bootstrap-vue';

Vue.configureCompat({
  MODE: 2,
  // required by portal-vue
  GLOBAL_SET: "suppress-warning",

  // globals
  GLOBAL_EXTEND: "suppress-warning",
  GLOBAL_MOUNT: "suppress-warning",
  GLOBAL_PROTOTYPE: "suppress-warning",

  // functional does not work how you think ;)
  COMPONENT_FUNCTIONAL: "suppress-warning",
  RENDER_FUNCTION: "suppress-warning",

  CUSTOM_DIR: "suppress-warning",
  INSTANCE_LISTENERS: "suppress-warning",
  WATCH_ARRAY: "suppress-warning",
  INSTANCE_SCOPED_SLOTS: "suppress-warning",
  INSTANCE_ATTRS_CLASS_STYLE: "suppress-warning",
  OPTIONS_BEFORE_DESTROY: "suppress-warning",
  OPTIONS_DATA_MERGE: "suppress-warning",
});

const originalVModelDynamicCreated = Vue.vModelDynamic.created;
const originalVModelDynamicBeforeUpdate = Vue.vModelDynamic.beforeUpdate;
Vue.vModelDynamic.created = function (el, binding, vnode) {
  originalVModelDynamicCreated.call(this, el, binding, vnode);
  if (!el._assign) {
    el._assign = () => {};
  }
};
Vue.vModelDynamic.beforeUpdate = function (el, binding, vnode) {
  originalVModelDynamicBeforeUpdate.call(this, el, binding, vnode);
  if (!el._assign) {
    el._assign = () => {};
  }
};

Vue.use(bootstrap);
Vue.use(BootstrapVueIcons);

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp(url) {
  const app = createSSRApp(App, { url });
  return { app };
}
