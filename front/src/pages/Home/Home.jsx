import Pagina from '../../components/Pagina/Pagina';
import './Home.css';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

//const Home: React.FC = () => {
const Home = function ({setUserLogged}) {
    let options = {
        credits: { enabled: false },
        /*chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },*/
        title: {
            enabled: false,
            /*text: 'Browser<br>shares<br>2017',
            align: 'center',
            verticalAlign: 'middle',
            y: 60*/
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            innerSize: '90%',
            data: [
                ['test', 100],
            ]
        }]
    };

    return (
        <Pagina title="Home" setUserLogged={setUserLogged}>
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </Pagina>
    );
};

export default Home;
