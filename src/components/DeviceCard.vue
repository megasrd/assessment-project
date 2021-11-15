<template>
    <div class="bg-white dark:bg-gray-700 device-card__wrapper relative">
        <div class="util-bar flex items-center justify-between">
            <div class="flex items-center">
                <i :class="`status${data.device_live.toLowerCase() === 'true' ? '--online' : '--offline'}`" />
                <span class="text-xs text-gray-400 inline-block leading-none ml-2"> {{ `${data.device_live.toLowerCase() === 'true' ? 'online' : 'offline'}` }} </span>
            </div>
            <modal>
                <template #header>
                    <h3> {{ data.name }} <span class="text-sm"> (v{{ data.settings["device.version"] }}) </span> </h3>
                </template>
                <template #body>
                    <div class="grid grid-cols-2 gap-y-2">
                        <div class="py-2 px-4 bg-gray-200 rounded-l-xl font-bold">
                            Description
                        </div>
                        <div class="py-2 px-4 bg-gray-200 rounded-r-xl">
                            {{ data.description || 'N/A' }}
                        </div>    

                        <div class="py-2 px-4 bg-gray-100 rounded-l-xl font-bold">
                            Uptime
                        </div>
                        <div class="py-2 px-4 bg-gray-100 rounded-r-xl">
                            {{ data.uptime_age || 'N/A' }}
                        </div>  

                        <div class="py-2 px-4 bg-gray-200 rounded-l-xl font-bold">
                            Last Heartbeat
                        </div>
                        <div class="py-2 px-4 bg-gray-200 rounded-r-xl">
                            {{ data.last_heartbeat_age || 'N/A' }}
                        </div>       

                        <div class="py-2 px-4 bg-gray-100 rounded-l-xl font-bold">
                           First Seen
                        </div>
                        <div class="py-2 px-4 bg-gray-100 rounded-r-xl">
                            {{ data.first_seen_age || 'N/A' }}
                        </div>                         

                        <div class="py-2 px-4 bg-gray-200 rounded-l-xl font-bold">
                            Operating System
                        </div>
                        <div class="py-2 px-4 bg-gray-200 rounded-r-xl">
                            {{ data.ippers || 'N/A' }}
                        </div>  

                        <div class="py-2 px-4 bg-gray-100 rounded-l-xl font-bold">
                            MAC address
                        </div>
                        <div class="py-2 px-4 bg-gray-100 rounded-r-xl">
                            {{ data.mac_address || 'N/A' }}
                        </div>   

                    </div>
                </template>
                <template #button>
                    <span class="more-icon material-icons">
                        more_horiz
                    </span>
                </template>
            </modal>            
        </div>
        <h3 class="device-card__title text-gray-800 dark:text-white mb-1"> {{ data.name }} <span class="text-xs"> (v{{ data.settings["device.version"] }}) </span> </h3>
        <ul class="details text-gray-800 dark:text-gray-300">
            <li> 
                <span class="title"> Location: </span> 
                <span class="description"> {{ data.description }} </span>
            </li>
            <li> 
                <span class="title"> Uptime: </span> 
                <span class="description"> {{ data.uptime_age }} </span>
            </li>      
            <li> 
                <span class="title"> Last heartbeat: </span> 
                <span class="description"> {{ data.last_heartbeat_age }} </span>
            </li>                       
        </ul>
        <div v-if="data.ippers != undefined" class="os-icon absolute right-0 bottom-0 m-4 p-2 border border-gray-300 bg-gray-100 dark:border-gray-400 dark:bg-gray-500 rounded-full">
            <img class="p-1 w-8 h-8 object-contain" :src="`${ data.ippers ? require('@/assets/images/' + data.ippers +'.png') : '' }`" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .dark {
        .os-icon {
            img {
                filter: brightness(0) invert(1);
            }
        }
    }
    .device-card {
        &__wrapper {
            display: inline-block;
            border-radius: 12px;
            padding: 12px 24px 18px 24px;
            min-width: 380px;
            min-height: 180px;
            box-shadow: #091e4240 0px 1px 1px, #091e424f 0px 0px 1px;
            background-size: 50%;
            background-repeat: no-repeat;
            background-position: right center;            
            .util-bar {
                .status {
                    display: inline-block;
                    border-radius: 100%;
                    height: 12px;
                    width: 12px;
                }
                .status--online {
                    @extend .status;
                    background-color: #46F643;                    
                }
                .status--offline {
                    @extend .status;
                    background-color: #C4C4C4;                    
                }                
                .more-icon {
                    cursor: pointer;
                    font-size: 28px;
                    color: #8f8f8f;
                    background: #fff;
                    border-radius: 6px;
                    padding: 0px 6px;
                    transition: background 0.2s ease-in;
                    user-select: none;
                    &:hover {
                         background: #ebebeb;
                         transition: background 0.2s ease-out;
                    }
                }
            }
            .details {
                li {                
                    list-style: none;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    display: grid;
                    font-size: 11px;
                    margin: 5px 0;
                    .title {
                        text-transform: uppercase;
                        font: {
                            weight: 700;
                        }
                    }
                    .description {
                        font: {
                            weight: 400;
                        }
                    }
                }
            }
        }
        &__title {
            font-size: 14px;
            font-weight: bold;
            color: #4F4F4F;
        }        
    }
</style>
<script>
import Modal from '@/components/Modal';
export default {
    name: 'DeviceCard',
    components: {
        Modal,
    },
    props: {
        data: {
            type: Object,
        },
    }
}
</script>