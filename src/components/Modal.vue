<template>
<div>
    <span @click.prevent="isActive = true">
        <slot name="button" /> 
    </span>
    <transition v-if="isActive" appear mode="out-in" name="modal">
        <div class="modal-wrapper">
            <div class="modal-inner">
                <div class="modal max-w-xl">
                    <div class="modal__container bg-white dark:bg-gray-700 relative">
                        <span @click.prevent="isActive = false" class="material-icons text-black dark:text-white absolute right-0 p-4 cursor-pointer">
                            close
                        </span>                        
                        <div class="modal__header text-gray-900 dark:text-gray-200">
                            <slot name="header" />
                        </div>                    
                        <div class="modal__body">
                            <slot name="body" />
                        </div>    
                        <div class="modal__footer">
                            <slot name="footer">
                                <span class="inline-block" @click="isActive = false">
                                    <d-button>
                                        Close
                                    </d-button>
                                </span>
                            </slot>
                        </div>                                    
                    </div>
                </div>
            </div>
        </div>    
    </transition>
</div>
</template>
<style lang="scss" scoped>
    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .modal-wrapper {
        transition: all 0.2s ease-in-out;
        backdrop-filter: blur(15px);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: table;
        z-index: 10000000;
        .modal-inner {
            background-color: rgba(53, 60, 67, 0.3);
            display: table-cell;
            vertical-align: middle;
            z-index: 300;
            position: relative;
            height: 100%;
            @media (min-width: 450px) {
                padding: 50px;
            }
            @media (max-width: 780px) {
                display: block;
            }
            .modal {
                transition: all 0.3s ease;
                padding-bottom: 0;
                position: relative;
                margin-left: auto;
                margin-right: auto;
                &__container {
                    box-shadow: 0px 4px 4px 0px #00000040;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    overflow-y: hidden;
                    position: relative;
                    height: 100%;       
                    @media (min-width: 640px) {
                        border-radius: 24px;
                    }
                }
                &__header {
                    padding: 18px 26px;
                    font-weight: bold;
                    font-size: 24px;                    
                }
                &__body {
                    padding: 18px 26px;  
                    position: relative;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-color: #b4bcc4 #f2f5f7;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    text-align: left;
                    z-index: 500;        
                    @media (max-width: 450px) {
                        min-height: 75vh;
                    }    
                }
                &__footer {
                    position: relative;
                    width: 100%;
                    margin-top: -1px;
                    overflow: hidden;
                    display: flex;
                    border-radius: 0;
                    justify-content: flex-end;
                    padding: 18px 26px;
                    border-top: 1px solid rgb(129, 129, 129);
                    @media (min-width: 640px) {
                        border: none;
                        padding: 20px 20px 24px 20px;
                    }
                    @media (max-width: 780px) {
                        z-index: 900;
                    }
                    @media (max-width: 425px) {
                        flex-wrap: wrap;
                    }                    
                }
            }
        }
    }
</style>
<script>
import dButton from '@/components/Button.vue';
export default {
    components: {
        dButton
    },
    name: 'Modal',
    props: {
        isActive: {
            type: Boolean,
            default: false,
        }
    }
}
</script>