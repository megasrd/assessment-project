<template>
    <button class="canary-btn">
        <slot> Click me </slot>
    </button>
</template>
<style lang="scss" scoped>
@import '@/assets/css/utilities/colors.scss';
.canary-btn {
    background: $col-primary-100;
    padding: 8px 24px;
    border-radius: 24px;
    color: #fff;
    font-weight: bold;
    &:hover {
        background: $col-primary-hover;
    }
}
</style>