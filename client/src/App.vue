<script setup lang="ts">
import { ref } from "vue";
import "./assets/css/index.css";
import "./assets/css/animate.css";
import { useAppProvider, IAppProvider } from "@/providers/app";
import APIConsumer from "@/composables/useAPIConsumer";
import { useI18n } from "vue-i18n";
import { Flag } from "@/app.organizer";
import { onKeyStroke } from "@vueuse/core";

type Errors = {
  [key: string]: string[];
};

const App: IAppProvider = useAppProvider();

const { t: print, locale } = useI18n();
locale.value = App.lang.value;

const number = ref<number>();
const errors = ref<Errors>({} as Errors);
const result = ref<string | null>(null);
const isFetching = ref<boolean>(false);

const composeErrors = (Apierrors: Errors) => {
  for (const [key, value] of Object.entries(Apierrors)) {
    if (!errors.value[key]) errors.value[key] = [];
    errors.value[key] = value;
  }
};

const submit = async () => {
  if (
    typeof number.value !== "number" ||
    number.value < 0 ||
    number.value > 100
  ) {
    errors.value["number"] = [];
    errors.value["number"].push(print("enter_a_number_between", [0, 100]));
    errors.value = errors.value;
    console.log('retunr error');
    return;
  }
  isFetching.value = true;

  const response = await APIConsumer(
    "post",
    "/web/roman/convert",
    number.value
  );

  number.value = undefined;
  if (response && !response.errors.length) {
    result.value = response.data;
  } else {
    if (response) composeErrors(response.errors);
  }
  isFetching.value = false;
};

const resetErrors = () => {
  errors.value = {};
  result.value = null;
};

onKeyStroke(["Enter"], (e) => {
  e.preventDefault();
  submit();
});
</script>

<template>
  <div id="app" :class="[App.theme.value]">
    <div class="flex flex-1 justify-center items-center h-full w-full">
      <div class="form-card min-w-300">
        <div class="title text-4xl font-bold mb-4">Numeroman</div>
        <div
          class="inputs border-2 border-gray-200 pt-8 pb-3 pl-4 pr-4 rounded"
        >
          <label
            for="number"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            {{ print("enter_a_number_between", [0, 100]) }}
          </label>
          <input
            class="border-2 border-blue-500 p-2 rounded w-full mt-3"
            type="number"
            max="100"
            min="0"
            v-model="number"
            :placeholder="print('type_a_number')"
            @input="resetErrors"
          />
          <div v-if="Object.entries(errors).length" class="error">
            <div
              v-for="(errorDatas, index) in errors"
              :key="`e1-${index}`"
              class="text-sm font-bold mt-2 bg-red-500 px-3 rounded-full py-1 text-white"
            >
              <div v-for="(error, index) in errorDatas" :key="`e2-${index}`">
                {{ error }}
              </div>
            </div>
          </div>
          <div
            v-if="result"
            class="bg-yellow-200 flex justify-center items-center p-4 mt-3 text-4xl "
          >
            {{ result }}
          </div>
          <button
            type="button"
            class="bg-blue-500 text-white font-bold capitalize p-4 px-8 mx-auto block mt-5 rounded"
            @click="submit"
          >
            {{ print("convert") }}
          </button>
          <div class="flex justify-center items-center p-4 mt-3">
            <Flag
              type="fr"
              :isActive="App.lang.value === 'fr'"
              @click="() => App.setLanguage('fr')"
            />
            <Flag
              type="en"
              :isActive="App.lang.value === 'en'"
              @click="() => App.setLanguage('en')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
