import React, {useState} from 'react' ;
import axios from 'axios';

let SearchEngine = () => {
    let [city, setCity] = useState("");
    let [infoTemp, setInfoTemp] = useState({
        temperature: null,
        description: null,
        humidity: null,
        wind: null,
        icon: null,
        name: null,
        date: null,
    });
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=88724523008dc9e1be18f6eb6a959b67&units=metric`;

    function searchHandled(event) {
        event.preventDefault();
        axios.get(url).then(showTem)
    }

    function showTem(response) {
        console.log(response);
        setInfoTemp(
            {
                temperature: Math.round(response.data.main.temp),
                description: response.data.weather[0].description,
                humidity: response.data.main.humidity,
                wind: response.data.wind.speed,
                icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                name: response.data.name,
                date: convertTime(response.data.dt),
                pressure: response.data.main.pressure,
            }
        )

    }

    function updadeValue(event) {
        setCity(event.target.value);
    }

    function convertTime() {

        let unix_timestamp = infoTemp.date;
        let date = new Date(unix_timestamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();

        let formattedTime = hours + ':' + minutes.substr(-2);

        return formattedTime
    }

    return (
        <>
            <div className="container">
                <div className="weather-app">
                    <form className="search-form" onSubmit={searchHandled} id="search-form">
                        <div className="row">
                            <div className="col-9">
                                <input type="search" placeholder="Type a city.." onChange={updadeValue} autoFocus="on"
                                       autoComplete="off"
                                       id="city-input" className="form-control shadow-sm"/>
                            </div>
                            <div className="col-3">
                                <input id="location-button" type="button" value="Search"
                                       className="form-control btn btn-dark p-2 shadow-sm"/>
                            </div>

                        </div>
                    </form>
                    <div id="app">

                        <h1 className="pb-2" id="city">{infoTemp.name}</h1>
                        <ul>
                            <li className="pb-2" id="date">Time: {infoTemp.date}</li>
                            <li className="pb-2" id="weather-type">Description: {infoTemp.description}</li>
                        </ul>
                        <div className="row">
                            <div className="col-6">
                                <div className="clearfix">
                                    <img id="icon" alt={""} src={infoTemp.icon}
                                         className="weather-icon float-left"/>
                                    <div className="float-left">
                                        <span className="temperature"
                                              id="temperature">Temperature(°C): {infoTemp.temperature} </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <ul>
                                    <li>
                                        Precipitation: {infoTemp.pressure}
                                    </li>
                                    <li>
                                        Humidity:<span id="humidity">{infoTemp.humidity}</span>
                                    </li>
                                    <li>
                                        Wind: <span id="wind">{infoTemp.wind}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="weather-forecast" id="forecast"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SearchEngine;
