import apixu from '../src/api/apixu';
var api = null;

before(() => {
    api = new apixu('63044e3b457c463582e223928190703');
});

mocha.timeout(5000);

describe('Testing Apixu', () => {
    it('Should contain return data for Chicago', (done) => {
        api.getCurrentWeather('60645')
            .then(data => {
                chai.assert.equal('Chicago', data.location.name);
                done();
            })
            .catch(err => {
                done(new Error(err));
            });
    });
    it('Should throw an "No matching location found." on getCurrentWeather', (done) => {
        api.getCurrentWeather('aaaaaaaaaaaaa')
            .then(data => {
                done(new Error(err));
            })
            .catch(err => {
                chai.assert.equal("No matching location found.", err);
                done();
            });
    });
    it('Should return an array of forecast data', (done) => {
        api.getCurrentForecast('Chicago')
            .then(data => {
                chai.assert.equal(true, data.forecast.forecastday.length > 4);
                done();
            })
            .catch(err => {
                done(new Error(err));
            });
    });
    it('Should throw "No matching location found." on getCurrentForecast', (done) => {
        api.getCurrentForecast('ggggg')
            .then(data => {
                done(new Error(err));
            })
            .catch(err => {
                chai.assert.equal("No matching location found.", err);
                done();
            });
    });
});