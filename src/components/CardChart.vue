<script lang="ts" setup>
import Chart from "chart.js/auto";
import { onMounted, ref, toRefs, watch, shallowRef } from "vue";
import {
  changeOpacity,
  hexToRgba,
} from "@/common/utils/dashboard/changeColorOpacity.util";

const props = defineProps<{
  id: string;
  title: string;
  data: {
    incomes: number[];
    expenses: number[];
  };
  labels: string[];
  primaryColor: string;
  secondColor: string;
}>();

const { data, labels, primaryColor, secondColor, id } = toRefs(props);
const chartInstance = ref();

const createChart = () => {
  const ctx = document.getElementById(id.value) as HTMLCanvasElement;
  if (chartInstance.value) {
    chartInstance.value.value.destroy();
  }

  chartInstance.value = shallowRef(
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels.value,
        datasets: [
          {
            label: "Incomes",
            data: data.value.incomes,
            borderWidth: 2,
            backgroundColor: hexToRgba(primaryColor.value, 0.4),
            borderColor: primaryColor.value,
          },
          {
            label: "Expenses",
            data: data.value.expenses,
            borderWidth: 2,
            backgroundColor: hexToRgba(secondColor.value, 0.4),
            borderColor: secondColor.value,
          },
        ],
      },
    })
  );
};

onMounted(() => {
  createChart();
});

watch(
  data,
  (create) => {
    createChart();
  },
  { deep: true }
);
</script>
<template>
  <div
    class="flex flex-col items-center justify-center md:gap-3 md:min-h-[400px] bg-white shadow-md rounded-lg py-5 px-2 md:p-5 md:min-w-[600px] w-full"
  >
    <canvas ref="chart" :id="id" class="h-50vh"></canvas>
    <h3 class="text-xl font-semibold">{{ title }}</h3>
  </div>
</template>
