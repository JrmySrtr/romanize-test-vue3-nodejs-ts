import { AVAILABLE_LANGUAGES, AVAILABLE_THEMES } from "@/app.constants";
import { LOCALSTORAGE_LANGUAGE, LOCALSTORAGE_THEME } from "@/app.storages";
import { reactive, Ref, toRefs } from "vue";
import useLocalStorage from '@/composables/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

export type TLangs = 'fr' | 'en'
type TThemes = 'light' | 'dark'

export interface IAppProvider {
  uuid: Ref<string>
  lang: Ref<TLangs>
  theme: Ref<TThemes>
  loadingRoute: Ref<boolean>;
  setLanguage: (value: TLangs) => void
  setTheme: (value: TThemes) => void
}

const state = reactive({
  uuid: uuidv4(),
  loadingRoute: false,
  lang: useLocalStorage.get(LOCALSTORAGE_LANGUAGE) || "en",
  theme: useLocalStorage.get(LOCALSTORAGE_THEME) || "light",
});

export function useAppProvider(): IAppProvider{
  

  /*
  /* SETTERS
  */
  //DevNote : This is only for demo, in my projects I use asynchronous methods for each language load.
  const setLanguage = (value: TLangs): void => {
    if (!Object.values(AVAILABLE_LANGUAGES).includes(value)) return;
    useLocalStorage.set(LOCALSTORAGE_LANGUAGE, value);
    state.lang = value;
  }

  const setTheme = (value: string): void => {
    if (!Object.values(AVAILABLE_THEMES).includes(value)) return;
    useLocalStorage.set(LOCALSTORAGE_THEME, value);
    state.theme = value;
  };

  return {
    ...toRefs(state),
    setTheme,
    setLanguage
  };
}
