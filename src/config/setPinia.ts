import { App } from "vue";
import { createPinia } from "pinia";

export default function setPinia(app: App): App {
  app.use(createPinia());

  return app;
}
