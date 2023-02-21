import { defineAsyncComponent } from 'vue';


export const Flag = defineAsyncComponent(() => import( './components/Flag.vue' ));
