<template>
<div v-if="canary_data != null">
  <h3 class="text-gray-700 dark:text-white text-2xl font-semibold border-b border-gray-300 dark:border-gray-500 pb-3 mb-8"> <span class="material-icons mr-1 text-base"> dns </span> <span> Canaries <span class="text-sm font-medium text-gray-500 dark:text-gray-300"> ({{ getDevices.length }} Devices) </span> </span> </h3>
  <!-- Devices -->
  <div class="overflow-y-scroll py-2">
    <div class="devices-wrapper">
        <div v-for="(item, key) in canary_data.device_list" :key="key">
            <device-card :data="item" />
        </div>
    </div>
  </div>
  <h3 class="text-gray-700 dark:text-white text-2xl font-semibold border-b border-gray-300 dark:border-gray-500 pb-3  mb-9 mt-14"> <span class="material-icons mr-1 text-base"> warning </span> Incidents </h3>
  <!-- Incidents -->
    <div class="px-9 grid items-center grid-cols-6 gap-x-20 font-semibold text-xs mb-6 text-gray-600 dark:text-gray-200">
      <div @click="tableSortSettings.incident =! tableSortSettings.incident" class="relative cursor-pointer flex justify-between items-center select-none rounded-lg shadow p-3 w-full bg-gray-100 hover:bg-gray-200"> 
        {{ filter_settings.incident || 'Incident' }}
        <span class="material-icons">
          sort
        </span>
        <div v-if="tableSortSettings.incident" class="sort-menu absolute z-50 top-0 left-0 bg-gray-100 shadow p-3 mt-12 w-40 rounded-lg">
          <ul>
            <li v-for="(item, key) in incidentList" :key="key" @click="(filteredByIncident(item))" class="my-2 py-2 px-3 hover:bg-gray-200 rounded-lg"> {{ item }} </li>
          </ul>
        </div>
      </div>
      <input id="canary_ip" name="canary_ip" style="display: none" type="checkbox"/>
      <div class="relative cursor-pointer flex justify-between items-center select-none rounded-lg shadow p-3 w-full bg-gray-100 hover:bg-gray-200"> 
        {{ filter_settings.canary_ip || 'Canary IP Address' }}
        <span class="material-icons">
          sort
        </span>        
        <!-- <div class="sort-menu absolute top-0 left-0 bg-gray-100 shadow p-3 mt-12 w-40 rounded-lg">
          <ul>
            <li v-for="(item, key) in incidentList" :key="key" @click="(filteredByIncident(item), document.getElementByClass('sort-menu')[0].style.display = 'none')" class="my-2 py-2 px-3 hover:bg-gray-200 rounded-lg"> {{ item }} </li>
          </ul>
        </div>         -->
      </div>
      <div class="relative cursor-pointer flex justify-between items-center select-none rounded-lg shadow p-3 w-full bg-gray-100 hover:bg-gray-200"> 
        Attackers IP Address
        <span class="material-icons">
          sort
        </span>        
      </div>
      <div class="relative cursor-pointer flex justify-between items-center select-none rounded-lg shadow p-3 w-full bg-gray-100 hover:bg-gray-200"> 
        Created
        <span class="material-icons">
          sort
        </span>        
      </div>
      <div class="relative cursor-pointer flex justify-between items-center select-none rounded-lg shadow p-3 w-full bg-gray-100 hover:bg-gray-200"> 
        Node ID
        <span class="material-icons">
          sort
        </span>        
      </div>
    </div>  
    <div class="px-12 grid items-center grid-cols-6 gap-x-24 font-bold text-sm mb-3 mt-8 text-gray-800 dark:text-gray-200">
      <h4> Incident type </h4>
      <h4> Canary IP Address </h4>
      <h4> Attackers IP Address </h4>
      <h4> Created </h4>
      <h4> Node ID </h4>
    </div>
    <div v-for="(item, key) in filtered_data" :key="key" class="grid items-center grid-cols-6 gap-x-24 px-12 py-6 text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-700 rounded-lg my-4">
        <div class="font-bold text-sm"> {{ item.description }} </div>
        <div class="font-bold text-sm px-2 py-1 border border-gray-300 bg-gray-100 dark:bg-gray-600 rounded-full text-center w-40"> {{ item.dst_host || 'N/A' }} </div>
        <div class="font-bold text-sm px-2 py-1 border border-gray-300 bg-gray-100 dark:bg-gray-600 rounded-full text-center w-40"> {{ item.src_host || 'N/A' }} </div>
        <div> {{ item.created_age }} </div>
        <div> {{ item.node_id }} </div>
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
export default {
  name: 'Home',
  components: {
    DeviceCard,
  },
  data() {
    return {
      canary_data: null,
      filtered_data: [],
      filter_settings: {
        incident: undefined,
        canary_ip: undefined,
      },
      incidentList: ['Canary Disconnected', 'HTTP Login Attempt', 'Host Port Scan', 'NMAP OS Scan Detected', 'SNMP Request', 'SIP Request', 'Telnet Login Attempt', 'TFTP Request'],
      canaryIpList: [],
      tableSortSettings: {
        incident: false,
        canaryIP: false,
        attackIP: false,
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('getData')
    this.canary_data = this.$store.state.canary_data;
    this.filtered_data = this.$store.state.canary_data.alerts;
  },
  methods: {
    // filteredCanaries(nodeID) {
    //   let filtered = this.canary_data.alerts.filter(function(alert) {
    //     if (nodeID === undefined) {
    //       return true
    //     }else {
    //       return alert.node_id === nodeID
    //     }
        
    //   } )
    //   return filtered
    // },
    filteredByIncident(incident) {
      let filtered = this.canary_data.alerts.filter(function(alert) {
        if (incident === undefined) {
          return true
        }else {
          return alert.description === incident
        }
        
      } )
      this.filtered_data = filtered
      this.filter_settings.incident = incident;
    },
    filteredByCanaryIP(address) {
      let filtered = this.canary_data.alerts.filter(function(alert) {
        if (address === undefined) {
          return true
        }else {
          return alert.src_host === address
        }
        
      } )
      this.filtered_data = filtered
      this.filter_settings.canary_ip = address;
    }        
  },
  computed: {
    getDevices() {
      return this.canary_data.device_list.map(function (item, key) {
        return item[key] = { device_name: item.name, node_id : item.node_id, os: item.ippers }
      })
    },
  }
}
</script>
