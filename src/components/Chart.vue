<script lang="ts" setup>
import { DaysArray, MonthsArrayShort } from "@const/index";
import { getForWeek } from "@common/utils/dashboard/getForWeek.util";
import { getForYear } from "@/common/utils/dashboard/getForYear.util";
import { getForMonth } from "@/common/utils/dashboard/getForMonth.util";
import CardChart from "@components/CardChart.vue";
import { onMounted, ref } from "vue";
import { changeOpacity, hexToRgba } from "@/common/utils/dashboard/changeColorOpacity.util";
interface ChartData {
    incomes: number[],
    expenses: number[],
    labels?: string[]
}
const mountForDays = ref<ChartData>({incomes: [], expenses: []});
const mountForMonth = ref<ChartData>({incomes: [], expenses: []});
const mountForYear = ref<ChartData>({incomes: [], expenses: []});

const labelDays = ref<string[]>([]);
const labelMonths = ref<string[]>([]);
const labelYears = ref<string[]>([]);


const getDaysForWeek = async (week:number, month:number, year:number) => {
    mountForDays.value =  await getForWeek(week, month, year);
    labelDays.value = DaysArray;
}

const getWeekForMonth = async (month:number, year:number) => {
    mountForMonth.value = await getForMonth(month, year);
    labelMonths.value = mountForMonth.value.labels || [];
}

const getMonthsForYear = async (year:number) => {
    mountForYear.value = await getForYear(year);
    labelYears.value = MonthsArrayShort;

}


onMounted(() => {
    getDaysForWeek(2,7,2024);
    getWeekForMonth(7,2024);
    getMonthsForYear(2024);
});
</script>
<template>
    <button @click="getDaysForWeek(2,7,2024)">Cambiar valores</button>
    <div class="flex w-full justify-between">
        <CardChart id="days" :data="mountForDays" :labels="labelDays" primaryColor="#4BC0C0" secondColor="#FF6384" title="Week" />
        <CardChart id="months" :data="mountForMonth" :labels="labelMonths" primaryColor="#4BC0C0" secondColor="#FF6384" title="Month" />
        <CardChart id="years" :data="mountForYear" :labels="labelYears" primaryColor="#4BC0C0" secondColor="#FF6384" title="Year" />
    </div>
</template>