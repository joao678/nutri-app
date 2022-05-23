import { GraficoDefaultChartOptions, GraficoDefaultTitleOptions } from "../../../components/Graficos/GraficoDefaultOptions";

export default {
    credits: { enabled: false },
    chart: {
        ...GraficoDefaultChartOptions,
        events: {
            load() { setTimeout(this.reflow.bind(this), 100)},
        }
    },
    title: {
        text: '',
        ...GraficoDefaultTitleOptions
    },
    tooltip: {
        enabled: false
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: -90,
            center: ['50%', '50%'],
            size: '90%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Calorias',
        innerSize: '90%',
        data: [
            ['0/2500 kcal', 50]
        ]
    }]
}