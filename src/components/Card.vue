<script setup>
import { defineProps } from 'vue';

defineProps({
    bg: {
        type: String,
        default: 'bg-zinc-900'
    }
});
</script>

<template>
    <div :class="[bg, 'p-8 rounded-2xl shadow-lg border border-zinc-800/50 relative overflow-hidden group']">
        <slot></slot>
    </div>
</template>
