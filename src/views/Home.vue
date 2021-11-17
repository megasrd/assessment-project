<template>
<div v-if="this.$store.state.canary_data != null">
  <h3 class="text-gray-700 dark:text-white text-2xl font-semibold border-b border-gray-300 dark:border-gray-500 pb-3 mb-4"> <span class="material-icons mr-1 text-base"> dns </span> <span> Canaries <span class="text-sm font-medium text-gray-500 dark:text-gray-300"> ({{ getDevices.length }} Devices) </span> </span> </h3>
  <!-- Devices -->
    <div class="space-x-2 pb-5">
      <span class="cursor-pointer inline-block rounded-full leading-none text-2xl text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 p-2 h-10 w-10">
        <span class="material-icons ">
        keyboard_arrow_left
        </span>
      </span>      
      <span class="cursor-pointer inline-block rounded-full leading-none text-2xl text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 p-2 h-10 w-10">
        <span class="material-icons ">
        keyboard_arrow_right
        </span>
      </span>
    </div>  
  <div class="overflow-y-hidden p-2">
    <div class="devices-wrapper">
        <div v-for="(item, key) in this.$store.state.canary_data.device_list" :key="key">
            <device-card :data="item" />
        </div>
    </div>
  </div>
  <h3 class="text-gray-700 dark:text-white text-2xl font-semibold border-b border-gray-300 dark:border-gray-500 pb-3 mt-12 mb-8"> <span class="material-icons mr-1 text-base"> trending_up </span> <span> Statistics </span> </h3>
  <div  @click="statistics_settings.menu =! statistics_settings.menu" class="text-xs text-gray-600 dark:text-gray-200 max-w-sm relative cursor-pointer flex justify-between items-center select-none rounded-lg shadow p-3 w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark-hover:bg-gray-800"> 
    {{ statistics_settings.currentChart === 'attackers' ? 'Most Frequent Attackers (IP Address)' :
      statistics_settings.currentChart === 'incidents' ? 'Most Frequent Incidents' :
       statistics_settings.currentChart === 'canaries' ? 'Most Frequent Attacked Canary' : '' }}
    <span class="material-icons">
      sort
    </span>
    <div v-if="statistics_settings.menu" class="sort-menu absolute z-50 top-0 left-0 bg-gray-100 dark:bg-gray-700 shadow p-3 mt-12 w-40 rounded-lg">
      <ul>
        <li @click="statistics_settings.currentChart = 'attackers'" class="my-2 py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">  Most Frequent Attackers (IP Address) </li>
        <li @click="statistics_settings.currentChart = 'incidents'" class="my-2 py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">  Most Frequent Incidents </li>
        <li @click="statistics_settings.currentChart = 'canaries'" class="my-2 py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">  Most Frequent Attacked Canary </li>
      </ul>
    </div>    
  </div>  
  <div class="mt-6 mb-20">
    <div class="relative lg:max-w-2xl md:max-w-5xl py-8 px-6 bg-white dark:bg-gray-700 shadow rounded-xl">
      <chart v-show="statistics_settings.currentChart === 'attackers'" title="Most Frequent Attackers (IP Address)" data-title="Attacks" id="attackers-chart" type="bar" :labels="Object.keys(getHits('src_host', true))" :data="Object.values(getHits('src_host', true))" />
      <chart v-show="statistics_settings.currentChart === 'incidents'" title="Most Frequent Incidents" data-title="Incidents" id="incidents-chart" type="bar" :labels="Object.keys(getHits('description', true))" :data="Object.values(getHits('description', true))" />
      <chart v-show="statistics_settings.currentChart === 'canaries'" title="Most Frequent Attacked Canary" data-title="Canaries" id="canaries-chart" type="bar" :labels="Object.keys(getHits('dst_host', true))" :data="Object.values(getHits('dst_host', true))" />      
    </div>
  </div>  
  <h3 class="text-gray-700 dark:text-white text-2xl font-semibold border-b border-gray-300 dark:border-gray-500 pb-3  mb-9 mt-14"> <span class="material-icons mr-1 text-base"> warning </span> Incidents </h3>
  <!-- Incidents -->
    <div class="px-9 grid items-center grid-cols-6 gap-x-20 font-semibold text-xs mb-6 text-gray-600 dark:text-gray-200">
      <div @click="tableSortSettings.incident =! tableSortSettings.incident" class="relative cursor-pointer flex justify-between items-center select-none rounded-lg shadow p-3 w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark-hover:bg-gray-800"> 
        {{ filter_settings.description || 'Incident' }}
        <span class="material-icons">
          sort
        </span>
        <div v-if="tableSortSettings.incident" class="sort-menu absolute z-50 top-0 left-0 bg-gray-100 dark:bg-gray-700 shadow p-3 mt-12 w-40 rounded-lg">
          <ul>
            <li v-for="(item, key) in getIncidents" :key="key" @click="(filteredBy(key, 'description'))" class="my-2 py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"> {{ key }} ({{ item }}) </li>
          </ul>
        </div>
      </div>
      <div @click="tableSortSettings.attackIP =! tableSortSettings.attackIP" class="relative cursor-pointer flex justify-between items-center select-none rounded-lg shadow p-3 w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark-hover:bg-gray-800"> 
        {{ filter_settings.src_host || 'Attackers IP Address' }}
        <span class="material-icons">
          sort
        </span>
        <div v-if="tableSortSettings.attackIP" class="sort-menu absolute z-50 top-0 left-0 bg-gray-100 dark:bg-gray-700 shadow p-3 mt-12 w-40 rounded-lg">
          <ul>
            <li v-for="(item, key) in getSpecData('src_host')" :key="key" @click="(filteredBy(key, 'src_host'))" class="my-2 py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"> {{ key }} ({{ item }}) </li>
          </ul>
        </div>
      </div>
    </div>  
    <div class="px-12 grid items-center grid-cols-6 gap-x-12 font-bold text-sm mb-3 mt-8 text-gray-700 dark:text-gray-200">
      <h4> Incident type </h4>
      <h4> Attackers IP Address </h4>
      <h4> Attackers IP Address (Reversed) </h4>
      <h4> Canary IP Address </h4>
      <h4> Created </h4>
    </div>
    <div v-for="(item, key) in filtered_data" :key="key" class="grid items-center grid-cols-6 gap-x-12 px-12 py-6 text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-700 rounded-lg my-4">
        <div class="font-bold text-sm"> {{ item.description }} </div>
        <div class="font-bold text-xs px-2 py-1 border border-gray-300 bg-gray-100 dark:bg-gray-600 rounded-full text-center w-40"> {{ item.src_host || 'N/A' }} </div>
        <div class="font-bold text-xs px-2 py-1"> {{ item.src_host_reverse || 'N/A' }} </div>
        <div class="font-bold text-xs"> {{ item.dst_host }} </div>
        <div class="font-bold text-xs"> {{ item.created_age }} </div>
        <div>
            <modal>
                <template #header>
                    <h3> {{ item.description }} </h3>
                </template>
                <template #body>
                    <div class="grid grid-cols-2 gap-y-2">
                        <div class="py-2 px-4 text-gray-900 dark:text-gray-200 text-sm bg-gray-100 dark:bg-gray-500 rounded-l-xl font-bold">
                            Attackers IP
                        </div>
                        <div class="py-2 px-4 text-gray-900 dark:text-gray-200 text-sm bg-gray-100 dark:bg-gray-500 rounded-r-xl">
                            {{ item.src_host || 'N/A' }}
                        </div>           

                        <div class="py-2 px-4 text-gray-900 dark:text-gray-200 text-sm bg-gray-200 dark:bg-gray-600 rounded-l-xl font-bold">
                            Attackers IP (Reversed)
                        </div>
                        <div class="py-2 px-4 text-gray-900 dark:text-gray-200 text-sm bg-gray-200 dark:bg-gray-600 rounded-r-xl">
                            {{ item.src_host_reverse || 'N/A' }}
                        </div>   

                        <div class="py-2 px-4 text-gray-900 dark:text-gray-200 text-sm bg-gray-200 dark:bg-gray-600 rounded-l-xl font-bold">
                            Attackers Port
                        </div>
                        <div class="py-2 px-4 text-gray-900 dark:text-gray-200 text-sm bg-gray-200 dark:bg-gray-600 rounded-r-xl">
                            {{ item.src_port || 'N/A' }}
                        </div>                                                  

                    </div>
                </template>
                <template #button>
                    <span class="cursor-pointer rounded-lg text-2xl px-3 material-icons bg-white hover:bg-gray-200 dark:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800">
                        more_horiz
                    </span>
                </template>
            </modal>             
        </div>        
    </div>
</div>
</template>
<style lang="scss" scoped>  
  .devices-wrapper {
    display: flex;
    grid-gap: 12px;
  }
</style>
<script>
import DeviceCard from '@/components/DeviceCard';
import Chart from '../components/charts/chart.vue'
import Modal from '@/components/Modal';
export default {
  name: 'Home',
  components: {
    DeviceCard,
    Chart,
    Modal,
  },
  data() {
    return {
      filtered_data: [],
      statistics_settings: {
        menu: false,
        currentChart: 'attackers',
      },
      filter_settings: {
        incident: undefined,
        canary_ip: undefined,
      },
      tableSortSettings: {
        incident: false,
        attackIP: false,
      },
    }
  },
  async mounted() {
    await this.$store.dispatch('getData')
    this.filtered_data = this.$store.state.canary_data.alerts;
  },
  methods: {
    getHits(value, sortHigh) {
      let counts = {};
      let sorted = [];   
      let hits = this.$store.state.canary_data.alerts.map(function(item,key) {
          return item[key] = item[value]
      })          
      hits.forEach(function(x) { 
        counts[x] = (counts[x] || 0) + 1; 
      });     
      for (let ip in counts) {
        sorted.push([ip, counts[ip]]);
      }
      sorted.sort(function(a,b) {
        return a[1] - b[1];
      })
      if (sortHigh) {
        sorted.reverse()
      }
      //normalize to object
      let obj = {}
      for (let [value, key] of sorted) {
          obj[value] = key
      }
      return obj;
    },    
    filteredBy(type, reference) {
      let filtered = this.$store.state.canary_data.alerts.filter(function(alert) {
        if (type === undefined) {
          return true
        }else {
          return alert[reference] === type
        }
        
      } )
      this.filtered_data = filtered.reverse()
    },
    getSpecData(param) {
      let spec = this.$store.state.canary_data.alerts.map(function(item,key) {
          return item[key] = item[param]
      })      
      let counts = {};
      spec.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
      return counts
    },
    // get    
    // filteredByCanaryIP(address) {
    //   let filtered = this.canary_data.alerts.filter(function(alert) {
    //     if (address === undefined) {
    //       return true
    //     }else {
    //       return alert.src_host === address
    //     }
        
    //   } )
    //   this.filtered_data = filtered
    //   this.filter_settings.canary_ip = address;
    // }        
  },
  computed: {
    getIncidents() {
      let incidents = this.$store.state.canary_data.alerts.map(function(item,key) {
          return item[key] = item.description
      })      
      // Use this to get stats of each indident
      let counts = {};
      incidents.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
      // return [...new Set(incidents)]
      return counts
    },
    // getAttackers() {
    //   let counts = {};
    //   let sorted = [];   
    //   let allAttackers = this.$store.state.canary_data.alerts.map(function(item,key) {
    //       return item[key] = item.src_host
    //   })          

    //   allAttackers.forEach(function(x) { 
    //     counts[x] = (counts[x] || 0) + 1; 
    //   });     

    //   for (let ip in counts) {
    //     sorted.push([ip, counts[ip]]);
    //   }
    //   sorted.sort(function(a,b) {
    //     return a[1] - b[1];
    //   })

    //   //normalize to object

    //   let obj = {}
    //   for (let item in sorted) {
    //       obj[sorted[item][0]] = sorted[item][1]
    //   }
    //   console.log(sorted)

    //   return sorted.reverse();
    // },
    getDevices() {
      return this.$store.state.canary_data.device_list.map(function (item, key) {
        return item[key] = { device_name: item.name, node_id : item.node_id, os: item.ippers }
      })
    },
  }
}
</script>
