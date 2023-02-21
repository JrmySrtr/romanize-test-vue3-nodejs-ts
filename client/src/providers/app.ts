import { AVAILABLE_LANGUAGES, AVAILABLE_THEMES } from "@/app.constants";
import { LOCALSTORAGE_LANGUAGE, LOCALSTORAGE_THEME } from "@/app.storages";
import { reactive, Ref, toRefs } from "vue";
import useLocalStorage from '@/composables/useLocalStorage';
import { Router, RouteLocation } from "vue-router";
import { useI18n } from "vue-i18n";

export type TLangs = 'fr' | 'en'
type TThemes = 'light' | 'dark'

export interface IAppProvider {
  lang: Ref<TLangs>
  theme: Ref<TThemes>;
  loadingRoute: Ref<boolean>;
  setLanguage: (value: TLangs) => void;
  setTheme: (value: TThemes) => void;
}

export function useAppProvider(): IAppProvider{
  
  const { locale } = useI18n();
  const state = reactive({
    loadingRoute: false,
    lang: useLocalStorage.get(LOCALSTORAGE_LANGUAGE) || "en",
    theme: useLocalStorage.get(LOCALSTORAGE_THEME) || "light",
  });

  /*
  /* SETTERS
  */
  //DevNote : This is only for demo, in my projects I use asynchronous methods for each language load.
  const setLanguage = (value: TLangs): void => {
    if (!Object.values(AVAILABLE_LANGUAGES).includes(value)) return;
    useLocalStorage.set(LOCALSTORAGE_LANGUAGE, value);
    state.lang = value;
    locale.value = value;
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
