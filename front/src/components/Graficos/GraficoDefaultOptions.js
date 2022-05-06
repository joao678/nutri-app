const isDarkTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

export const GraficoDefaultChartOptions = {
    backgroundColor: 'transparent'
}

export const GraficoDefaultTitleOptions = {
    style: { color: isDarkTheme ? 'white' : 'black' }
}