import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import setPinia from "./installations/setPinia";
import setVueQuery from "./installations/setVueQuery";

const app = createApp(App);

setVueQuery(app);
setPinia(app);

app.use(router);

router.isReady().then(() => {
  app.mount("#app");
});
