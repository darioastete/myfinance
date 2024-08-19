<script lang="ts" setup>
import Chart from "chart.js/auto";
import { onMounted, ref, toRefs, watch, shallowRef } from 'vue';

const props = defineProps<{
    id: string,
    title: string,
    data: {
        incomes: number[],
        expenses: number[]
    },
    labels: string[],
    borderColor: string,
    backgroundColor: string
}>();

const { data, labels, borderColor, backgroundColor, id } = toRefs(props);
const chartInstance = ref();
// const ctx = ref<HTMLCanvasElement>({} as HTMLCanvasElement);

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
                backgroundColor: backgroundColor.value,
                borderColor: borderColor.value,
            },
            {
                label: 'Expenses',
                data: data.value.expenses,
                borderWidth: 2,
                backgroundColor: backgroundColor.value,
                borderColor: borderColor.value,
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