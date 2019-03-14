
export default class apixu {
    /**
     * Fields
     */
    private API_KEY: string;
    private CURRENT_JSON: string;
    private FORECAST_JSON: string;
    private LOCATION: string;

    constructor(key) {
        this.API_KEY = key;
        this.CURRENT_JSON = `${location.protocol}//api.apixu.com/v1/current.json?key=${this.API_KEY}`;
        this.FORECAST_JSON = `${location.protocol}//api.apixu.com/v1/forecast.json?key=${this.API_KEY}`;
        // this.requestLocation();
    }

    /**
     * geolocation has to be part of the navigator object
     */
    isGeo():boolean {
        /**
         * For testing return true
         */
        // return true;
        return !!navigator.geolocation;
    }
    /**
     * Returns a promise of true or false depending if the user accepted location
     */
    requestLocation():Promise<boolean> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.LOCATION = `${pos.coords.latitude},${pos.coords.longitude}`
                resolve(true)    
            }, () => {
                resolve(false);
            });
        });
    }

    /**
     * Async function that returns the raw data from a GET request on the apixu current.json API
     * @param locationQuery search field for query the apixu API
     * @param callback function that takes a data callback
     */
    async getCurrentWeather(locationQuery:string, callback: (data: any) => void) {
        let url;
        let userLocactionAcceptance = this.isGeo() ? await this.requestLocation() : false;

        if (userLocactionAcceptance && locationQuery == null) {
            url = this.CURRENT_JSON + `&q=${this.LOCATION}`;
        } else if (locationQuery != null) {
            url = this.CURRENT_JSON + `&q=${locationQuery}`;
        } else {
            url = this.CURRENT_JSON + `&q=60661`;
        }

        return new Promise((resolve, reject) => {
            var data = null;

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    try {
                        var jsonData = JSON.parse(this.responseText);
                        if(jsonData.error) {
                            reject(jsonData.error.message)
                        }else {
                            if(callback) {
                                callback(jsonData);
                            }
                            resolve(jsonData);
                        }
                    }catch(e) {
                        console.log('Unable to parse json');
                        reject('error');
                    }
                }
            });

            xhr.open("GET", url);

            xhr.send(data);
        });
    }
    /**
     * Async function that returns the raw data from a GET request on the apixu forecast.json API
     * @param locationQuery search field for query the apixu API
     * @param callback function that takes a data callback
     */
    async getCurrentForecast(locationQuery:string, callback: (data: any) => void):Promise<object> {
        let url;
        let userLocactionAcceptance = this.isGeo() ? await this.requestLocation() : false;
        
        if (userLocactionAcceptance && locationQuery == null) {
            url = this.FORECAST_JSON + `&q=${this.LOCATION}&days=10`;
        } else if (locationQuery != null) {
            url = this.FORECAST_JSON + `&q=${locationQuery}&days=10`;
        } else {
            url = this.FORECAST_JSON + `&q=60661&days=10`;
        }
        return new Promise((resolve, reject) => {
            var data = null;

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    try {
                        var jsonData = JSON.parse(this.responseText);
                        if(jsonData.error) {
                            reject(jsonData.error.message)
                        }else {
                            if(callback) {
                                callback(jsonData);
                            }
                            resolve(jsonData);
                        }
                    }catch(e) {
                        console.log('Unable to parse json');
                        reject('error');
                    }
                }
            });

            xhr.open("GET", url);

            xhr.send(data);
        });
    }
}