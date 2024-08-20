<script lang="ts" setup>
import {
  DaysArrayShort,
  MonthsArrayShort,
  Months,
  YearsArray,
  WeeksForMonth,
} from "@const/index";
import { getForWeek } from "@common/utils/dashboard/getForWeek.util";
import { getForYear } from "@/common/utils/dashboard/getForYear.util";
import { getForMonth } from "@/common/utils/dashboard/getForMonth.util";
import {
  getCurrentMonth,
  getCurrentYear,
  getCurrentWeekOfmonth,
} from "@/common/utils/dashboard/getCurrentDate.util";
import CardChart from "@components/CardChart.vue";
import Dropdown from "@components/Dropdown.vue";
import { onMounted, ref, watch } from "vue";

interface ChartData {
  incomes: number[];
  expenses: number[];
  labels?: string[];
}

const mountForDays = ref<ChartData>({ incomes: [], expenses: [] });
const mountForMonth = ref<ChartData>({ incomes: [], expenses: [] });
const mountForYear = ref<ChartData>({ incomes: [], expenses: [] });

const labelDays = ref<string[]>([]);
const labelMonths = ref<string[]>([]);
const labelYears = ref<string[]>([]);

const inputWeek = ref<number>(getCurrentWeekOfmonth());
const inputMonth = ref<number>(getCurrentMonth());
const inputYear = ref<number>(getCurrentYear());

const getDaysForWeek = async (week: number, month: number, year: number) => {
  mountForDays.value = await getForWeek(week, month, year);
  labelDays.value = DaysArrayShort;
};

const getWeekForMonth = async (month: number, year: number) => {
  mountForMonth.value = await getForMonth(month, year);
  labelMonths.value = mountForMonth.value.labels || [];
};

const getMonthsForYear = async (year: number) => {
  mountForYear.value = await getForYear(year);
  labelYears.value = MonthsArrayShort;
};

watch(inputWeek, () => {
  getDaysForWeek(inputWeek.value, inputMonth.value, inputYear.value);
});
watch(inputMonth, () => {
  getDaysForWeek(inputWeek.value, inputMonth.value, inputYear.value);
  getWeekForMonth(inputMonth.value, inputYear.value);
});

watch(inputYear, () => getAll());

const getAll = () => {
  getDaysForWeek(inputWeek.value, inputMonth.value, inputYear.value);
  getWeekForMonth(inputMonth.value, inputYear.value);
  getMonthsForYear(inputYear.value);
};

onMounted(getAll);
</script>
<template>
  <div class="flex flex-col w-full justify-between">
    <div class="flex flex-col md:flex-row justify-center gap-4 p-5">
      <Dropdown :data="WeeksForMonth" label="Week" v-model="inputWeek" />
      <Dropdown :data="Months" label="Month" v-model="inputMonth" />
      <Dropdown :data="YearsArray" label="Year" v-model="inputYear" />
    </div>
    <div class="flex flex-wrap w-full justify-center gap-5 md:p-5">
      <div>
        <CardChart
          id="days"
          :data="mountForDays"
          :labels="labelDays"
          primaryColor="#4BC0C0"
          secondColor="#FF6384"
          title="Week"
        />
      </div>
      <div>
        <CardChart
          id="months"
          :data="mountForMonth"
          :labels="labelMonths"
          primaryColor="#4BC0C0"
          secondColor="#FF6384"
          title="Month"
        />
      </div>
      <div>
        <CardChart
          id="years"
          :data="mountForYear"
          :labels="labelYears"
          primaryColor="#4BC0C0"
          secondColor="#FF6384"
          title="Year"
        />
      </div>
    </div>
  </div>
</template>
