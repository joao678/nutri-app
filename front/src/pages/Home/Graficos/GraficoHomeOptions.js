import { GraficoDefaultChartOptions, GraficoDefaultTitleOptions } from "../../../components/Graficos/GraficoDefaultOptions";

export default {
    credits: { enabled: false },
    chart: {
        ...GraficoDefaultChartOptions,
        type: 'solidgauge',
        events: {
            load() { setTimeout(this.reflow.bind(this), 100) },
        }
    },
    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            innerRadius: '0%',
            outerRadius: '0%'
        }
    },
    title: {
        text: '',
        ...GraficoDefaultTitleOptions
    },
    tooltip: { enabled: false },
    yAxis: {
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 0,
        min: 0,
        max: 1000,
        title: { y: -70 },
        labels: {
            y: 16,
            style: {
                color: 'white',
                fontWeight: 'bold'
            },
        }
    },
    plotOptions: {
        solidgauge: {
            dataLabels: {
                borderWidth: 0,
                borderRadius: 0,
                style: { textOutline: false },
                color: 'white',
                format: '{y:.2f}/kcal'
            }
        }
    },
    series: {
        type: 'solidgauge',
        data: [0],
    }
}