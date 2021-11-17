<template>
  <div class="w-auto">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 ml-5"> {{ title }} </h2>
    <canvas :id="id"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  props: {
      id: {
          type: String,
          default: 'chart'
      },       
      type: {
          type: String,
          default: 'bar'
      },      
      title: {
          type: String,
          default: 'Chart'
      },
      dataTitle: {
          type: String,
          default: 'Chart'
      },      
      labels: {
          type: Array,
          default: () => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      data: {
          type: Array,
          default: () => [60, 23, 25, 40, 79, 82, 27, 14]
      }
  },
  data() {
      return {
          chartData: {
            type: this.type,
            data: {
                labels: this.labels,
                datasets: [
                {
                    label: this.dataTitle,
                    data: this.data,
                    backgroundColor: "#24B47E",
                    borderColor: "#1c8a61",
                    borderWidth: 2
                },
                ]
            },
            options: {
                responsive: true,
                lineTension: 1,
                scales: {
                yAxes: [
                    {
                    ticks: {
                        beginAtZero: true,
                        padding: 25
                    }
                    }
                ]
                }
            }
        }
      }
  },
  mounted() {
    const ctx = document.getElementById(this.id);
    new Chart(ctx, this.chartData);
  }  
}
</script>
