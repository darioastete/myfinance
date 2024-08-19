<script lang="ts" setup>
import Chart from "chart.js/auto";
import { onMounted, ref, toRefs, watch, shallowRef } from 'vue';
import { changeOpacity, hexToRgba } from "@/common/utils/dashboard/changeColorOpacity.util";


const props = defineProps<{
    id: string,
    title: string,
    data: {
        incomes: number[],
        expenses: number[]
    },
    labels: string[],
    primaryColor: string,
    secondColor: string,
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
        type: 'bar',
        data: {
            labels: labels.value,
            datasets: [
            {
                label: 'Incomes',
                data: data.value.incomes,
                borderWidth: 2,
                backgroundColor: hexToRgba(primaryColor.value, 0.4),
                borderColor: primaryColor.value,
            },
            {
                label: 'Expenses',
                data: data.value.expenses,
                borderWidth: 2,
                backgroundColor: hexToRgba(secondColor.value, 0.4),
                borderColor: secondColor.value,
            },
        ]
        },
    })
    )
};

onMounted(() => {
    console.log('estaentrando');
    try {
        createChart();
    } catch (error) {
        console.error('Error creating chart:', error);
    }
});

watch(data, (newData, oldData) => {
    createChart();
}, { deep: true });

</script>
<template>
    <div class="flex flex-col w-full items-center justify-center gap-3">
        <canvas ref="chart" :id="id"  style="width: 100%; height: 200px;"></canvas>
        <h3 class="text-xl font-semibold">{{ title }}</h3>
    </div>
</template>