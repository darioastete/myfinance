<script setup lang="ts">
import { ref, toRefs } from 'vue';

const props = defineProps<{
    open: boolean;
    id:string;
}>();
const { open } = toRefs(props);
const isOpen = ref(open.value);

</script>
<template>
    <Teleport to="body">
        <div v-if="isOpen" class="modal">
            <p>Hello from the modal!</p>
            <button @click="isOpen = false">Close</button>
        </div>
    </Teleport>
</template>