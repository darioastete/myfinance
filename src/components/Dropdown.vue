<script lang="ts" setup>
import { onMounted, ref } from "vue";
const props = defineProps<{
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: any[];
  label: string;
}>();

const isDropdownVisible = ref(false);
const dropdownComponent = ref<HTMLBodyElement>();
const label = ref(props.label);
// const selectedItem = ref();
// const emit = defineEmits(["change"]);
const modelValue = defineModel<number>();

const toggleDropdown = (item?: any) => {
  isDropdownVisible.value = !isDropdownVisible.value;
  if (!item) return;
  // selectedItem.value = item;
  // emit("change", item);
  modelValue.value = item.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownComponent.value &&
    !dropdownComponent.value.contains(event.target as Node)
  ) {
    isDropdownVisible.value = false;
  }
};

const getLabelFromValue = (value: number) => {
  const item = props.data.find((item) => item.value === value);
  return item?.label;
};
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
</script>
<template>
  <div class="relative inline-block text-left" ref="dropdownComponent">
    <button
      @click="toggleDropdown()"
      type="button"
      class="inline-flex justify-center w-full min-w-28 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      aria-expanded="true"
      aria-haspopup="true"
    >
      {{ getLabelFromValue(modelValue) ?? label }}
      <!-- {{ modelValue?.label ?? "" }} -->
      <svg
        class="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <transition name="fade">
      <div
        v-if="isDropdownVisible"
        class="origin-top-right overflow-y-auto max-h-60 w-full absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none scroll-auto"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <a
            v-for="(item, index) in data"
            :key="index"
            class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            role="menuitem"
            tabindex="-1"
            @click="toggleDropdown(item)"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>
