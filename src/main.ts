import apixu from './api/apixu';

var api = new apixu('63044e3b457c463582e223928190703');

var vm = new Vue({
    el: '#app',
    data: {
        isFahrenheit: true,
        isForecastDataLoaded: false,
        isCurrentDataLoaded: false,
        forecast: [],
        current: {
            feelslike_c: '',
            feelslike_f: '',
            temp_c: '',
            temp_f: '',
            condition: '',
            icon: ''
        },
        searchValue: '',
        city: ''
    },
    methods: {
        toggle: function (e) {
            e.preventDefault();
            this.isFahrenheit = !this.isFahrenheit;
        },
        search: function () {
            this.isForecastDataLoaded = false;
            this.isCurrentDataLoaded = false;
            /**
             * Update the forecast data
             */
            api.getCurrentForecast(this.searchValue, (data) => {
                this.forecast = data.forecast.forecastday;
                this.city = data.location.name + ', ' + data.location.region;
                this.isForecastDataLoaded = true;
            }).catch(err => {
                console.log(err);
                this.isForecastDataLoaded = true;
                alert('An error occured. Check the console');
            });

            /**
             * Update the current weather data
             */
            api.getCurrentWeather(this.searchValue, (data) => {
                this.city = data.location.name + ', ' + data.location.region;
                this.current.feelslike_c = data.current.feelslike_c;
                this.current.feelslike_f = data.current.feelslike_f;
                this.current.temp_f = data.current.temp_f;
                this.current.temp_c = data.current.temp_c;
                this.current.condition = data.current.condition.text;
                this.current.icon = data.current.condition.icon;
                this.isCurrentDataLoaded = true;

            }).catch(err => {
                console.log(err);
                alert('An error occured. Check the console');
                this.isCurrentDataLoaded = true;
            });
        }
    }
});

/**
 * Initial Data Loading
 */
api.getCurrentForecast(null, (data) => {
    vm.city = data.location.name + ', ' + data.location.region
    vm.forecast = data.forecast.forecastday;
    vm.isForecastDataLoaded = true;
});
api.getCurrentWeather(null, (data) => {
    vm.city = data.location.name + ', ' + data.location.region
    vm.current.feelslike_c = data.current.feelslike_c;
    vm.current.feelslike_f = data.current.feelslike_f;
    vm.current.temp_f = data.current.temp_f;
    vm.current.temp_c = data.current.temp_c;
    vm.current.condition = data.current.condition.text;
    vm.current.icon = data.current.condition.icon;
    vm.isCurrentDataLoaded = true;
});