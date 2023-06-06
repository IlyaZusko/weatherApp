import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, FlatList, ImageBackground, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as FileSystem from 'expo-file-system';
import moment from 'moment';

// Constants
import { FORECAST_TWODAYS_WEATHER_API_URI } from '../Constants/Constants.js';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Images
import DayTimeBackground from '../../assets/img/day_time.png';
import NightTimeBackground from '../../assets/img/night_time.png';
import SunriseTimeBackground from '../../assets/img/sunrise_time.png';

const obj = [
    {
        key: 1000,
        day_icon: DAY1000,
        night_icon: NIGHT1000
    },
    {
        key: 1003,
        day_icon: DAY1003,
        night_icon: NIGHT1003
    },
    {
        key: 1006,
        day_icon: DAY1006,
        night_icon: NIGHT1006
    },
    {
        key: 1009,
        day_icon: DAY1009,
        night_icon: NIGHT1009
    },
    {
        key: 1030,
        day_icon: DAY1030,
        night_icon: NIGHT1030
    },
    {
        key: 1063,
        day_icon: DAY1063,
        night_icon: NIGHT1063
    },
    {
        key: 1066,
        day_icon: DAY1066,
        night_icon: NIGHT1066
    },
    {
        key: 1069,
        day_icon: DAY1069,
        night_icon: NIGHT1069
    },
    {
        key: 1072,
        day_icon: DAY1072,
        night_icon: NIGHT1072
    },
    {
        key: 1087,
        day_icon: DAY1087,
        night_icon: NIGHT1087
    },
    {
        key: 1114,
        day_icon: DAY1114,
        night_icon: NIGHT1114
    },
    {
        key: 1117,
        day_icon: DAY1117,
        night_icon: NIGHT1117
    },
    {
        key: 1135,
        day_icon: DAY1135,
        night_icon: NIGHT1135
    },
    {
        key: 1147,
        day_icon: DAY1147,
        night_icon: NIGHT1147
    },
    {
        key: 1150,
        day_icon: DAY1150,
        night_icon: NIGHT1150
    },
    {
        key: 1153,
        day_icon: DAY1153,
        night_icon: NIGHT1153
    },
    {
        key: 1168,
        day_icon: DAY1168,
        night_icon: NIGHT1168
    },
    {
        key: 1171,
        day_icon: DAY1171,
        night_icon: NIGHT1171
    },
    {
        key: 1180,
        day_icon: DAY1180,
        night_icon: NIGHT1180
    },
    {
        key: 1183,
        day_icon: DAY1183,
        night_icon: NIGHT1183
    },
    {
        key: 1186,
        day_icon: DAY1186,
        night_icon: NIGHT1186
    },
    {
        key: 1189,
        day_icon: DAY1189,
        night_icon: NIGHT1189
    },
    {
        key: 1192,
        day_icon: DAY1192,
        night_icon: NIGHT1192
    },
    {
        key: 1195,
        day_icon: DAY1195,
        night_icon: NIGHT1195
    },
    {
        key: 1198,
        day_icon: DAY1198,
        night_icon: NIGHT1198
    },
    {
        key: 1201,
        day_icon: DAY1201,
        night_icon: NIGHT1201
    },
    {
        key: 1204,
        day_icon: DAY1204,
        night_icon: NIGHT1204
    },
    {
        key: 1207,
        day_icon: DAY1207,
        night_icon: NIGHT1207
    },
    {
        key: 1210,
        day_icon: DAY1210,
        night_icon: NIGHT1210
    },
    {
        key: 1213,
        day_icon: DAY1213,
        night_icon: NIGHT1213
    },
    {
        key: 1216,
        day_icon: DAY1216,
        night_icon: NIGHT1216
    },
    {
        key: 1219,
        day_icon: DAY1219,
        night_icon: NIGHT1219
    },
    {
        key: 1222,
        day_icon: DAY1222,
        night_icon: NIGHT1222
    },
    {
        key: 1225,
        day_icon: DAY1225,
        night_icon: NIGHT1225
    },
    {
        key: 1237,
        day_icon: DAY1237,
        night_icon: NIGHT1237
    },
    {
        key: 1240,
        day_icon: DAY1240,
        night_icon: NIGHT1240
    },
    {
        key: 1243,
        day_icon: DAY1243,
        night_icon: NIGHT1243
    },
    {
        key: 1246,
        day_icon: DAY1246,
        night_icon: NIGHT1246
    },
    {
        key: 1249,
        day_icon: DAY1249,
        night_icon: NIGHT1249
    },
    {
        key: 1252,
        day_icon: DAY1252,
        night_icon: NIGHT1252
    },
    {
        key: 1255,
        day_icon: DAY1255,
        night_icon: NIGHT1255
    },
    {
        key: 1258,
        day_icon: DAY1258,
        night_icon: NIGHT1258
    },
    {
        key: 1261,
        day_icon: DAY1261,
        night_icon: NIGHT1261
    },
    {
        key: 1264,
        day_icon: DAY1264,
        night_icon: NIGHT1264
    },
    {
        key: 1273,
        day_icon: DAY1273,
        night_icon: NIGHT1273
    },
    {
        key: 1276,
        day_icon: DAY1276,
        night_icon: NIGHT1276
    },
    {
        key: 1279,
        day_icon: DAY1279,
        night_icon: NIGHT1279
    },
    {
        key: 1282,
        day_icon: DAY1282,
        night_icon: NIGHT1282
    },
]

// Custom Icons
import DAY1000 from '../../assets/icons/day_icon/1000.png';
import DAY1003 from '../../assets/icons/day_icon/1003.png';
import DAY1006 from '../../assets/icons/day_icon/1006.png';
import DAY1009 from '../../assets/icons/day_icon/1009.png';
import DAY1030 from '../../assets/icons/day_icon/1030.png';
import DAY1063 from '../../assets/icons/day_icon/1063.png';
import DAY1066 from '../../assets/icons/day_icon/1066.png';
import DAY1069 from '../../assets/icons/day_icon/1069.png';
import DAY1072 from '../../assets/icons/day_icon/1072.png';
import DAY1087 from '../../assets/icons/day_icon/1087.png';
import DAY1114 from '../../assets/icons/day_icon/1114.png';
import DAY1117 from '../../assets/icons/day_icon/1117.png';
import DAY1135 from '../../assets/icons/day_icon/1135.png';
import DAY1147 from '../../assets/icons/day_icon/1147.png';
import DAY1150 from '../../assets/icons/day_icon/1150.png';
import DAY1153 from '../../assets/icons/day_icon/1153.png';
import DAY1168 from '../../assets/icons/day_icon/1168.png';
import DAY1171 from '../../assets/icons/day_icon/1171.png';
import DAY1180 from '../../assets/icons/day_icon/1180.png';
import DAY1183 from '../../assets/icons/day_icon/1183.png';
import DAY1186 from '../../assets/icons/day_icon/1186.png';
import DAY1189 from '../../assets/icons/day_icon/1189.png';
import DAY1192 from '../../assets/icons/day_icon/1192.png';
import DAY1195 from '../../assets/icons/day_icon/1195.png';
import DAY1198 from '../../assets/icons/day_icon/1198.png';
import DAY1201 from '../../assets/icons/day_icon/1201.png';
import DAY1204 from '../../assets/icons/day_icon/1204.png';
import DAY1207 from '../../assets/icons/day_icon/1207.png';
import DAY1210 from '../../assets/icons/day_icon/1210.png';
import DAY1213 from '../../assets/icons/day_icon/1213.png';
import DAY1216 from '../../assets/icons/day_icon/1216.png';
import DAY1219 from '../../assets/icons/day_icon/1219.png';
import DAY1222 from '../../assets/icons/day_icon/1222.png';
import DAY1225 from '../../assets/icons/day_icon/1225.png';
import DAY1237 from '../../assets/icons/day_icon/1237.png';
import DAY1240 from '../../assets/icons/day_icon/1240.png';
import DAY1243 from '../../assets/icons/day_icon/1243.png';
import DAY1246 from '../../assets/icons/day_icon/1246.png';
import DAY1249 from '../../assets/icons/day_icon/1249.png';
import DAY1252 from '../../assets/icons/day_icon/1252.png';
import DAY1255 from '../../assets/icons/day_icon/1255.png';
import DAY1258 from '../../assets/icons/day_icon/1258.png';
import DAY1261 from '../../assets/icons/day_icon/1261.png';
import DAY1264 from '../../assets/icons/day_icon/1264.png';
import DAY1273 from '../../assets/icons/day_icon/1273.png';
import DAY1276 from '../../assets/icons/day_icon/1276.png';
import DAY1279 from '../../assets/icons/day_icon/1279.png';
import DAY1282 from '../../assets/icons/day_icon/1282.png';

//
import NIGHT1000 from '../../assets/icons/night_icon/1000.png';
import NIGHT1003 from '../../assets/icons/night_icon/1003.png';
import NIGHT1006 from '../../assets/icons/night_icon/1006.png';
import NIGHT1009 from '../../assets/icons/night_icon/1009.png';
import NIGHT1030 from '../../assets/icons/night_icon/1030.png';
import NIGHT1063 from '../../assets/icons/night_icon/1063.png';
import NIGHT1066 from '../../assets/icons/night_icon/1066.png';
import NIGHT1069 from '../../assets/icons/night_icon/1069.png';
import NIGHT1072 from '../../assets/icons/night_icon/1072.png';
import NIGHT1087 from '../../assets/icons/night_icon/1087.png';
import NIGHT1114 from '../../assets/icons/night_icon/1114.png';
import NIGHT1117 from '../../assets/icons/night_icon/1117.png';
import NIGHT1135 from '../../assets/icons/night_icon/1135.png';
import NIGHT1147 from '../../assets/icons/night_icon/1147.png';
import NIGHT1150 from '../../assets/icons/night_icon/1150.png';
import NIGHT1153 from '../../assets/icons/night_icon/1153.png';
import NIGHT1168 from '../../assets/icons/night_icon/1168.png';
import NIGHT1171 from '../../assets/icons/night_icon/1171.png';
import NIGHT1180 from '../../assets/icons/night_icon/1180.png';
import NIGHT1183 from '../../assets/icons/night_icon/1183.png';
import NIGHT1186 from '../../assets/icons/night_icon/1186.png';
import NIGHT1189 from '../../assets/icons/night_icon/1189.png';
import NIGHT1192 from '../../assets/icons/night_icon/1192.png';
import NIGHT1195 from '../../assets/icons/night_icon/1195.png';
import NIGHT1198 from '../../assets/icons/night_icon/1198.png';
import NIGHT1201 from '../../assets/icons/night_icon/1201.png';
import NIGHT1204 from '../../assets/icons/night_icon/1204.png';
import NIGHT1207 from '../../assets/icons/night_icon/1207.png';
import NIGHT1210 from '../../assets/icons/night_icon/1210.png';
import NIGHT1213 from '../../assets/icons/night_icon/1213.png';
import NIGHT1216 from '../../assets/icons/night_icon/1216.png';
import NIGHT1219 from '../../assets/icons/night_icon/1219.png';
import NIGHT1222 from '../../assets/icons/night_icon/1222.png';
import NIGHT1225 from '../../assets/icons/night_icon/1225.png';
import NIGHT1237 from '../../assets/icons/night_icon/1237.png';
import NIGHT1240 from '../../assets/icons/night_icon/1240.png';
import NIGHT1243 from '../../assets/icons/night_icon/1243.png';
import NIGHT1246 from '../../assets/icons/night_icon/1246.png';
import NIGHT1249 from '../../assets/icons/night_icon/1249.png';
import NIGHT1252 from '../../assets/icons/night_icon/1252.png';
import NIGHT1255 from '../../assets/icons/night_icon/1255.png';
import NIGHT1258 from '../../assets/icons/night_icon/1258.png';
import NIGHT1261 from '../../assets/icons/night_icon/1261.png';
import NIGHT1264 from '../../assets/icons/night_icon/1264.png';
import NIGHT1273 from '../../assets/icons/night_icon/1273.png';
import NIGHT1276 from '../../assets/icons/night_icon/1276.png';
import NIGHT1279 from '../../assets/icons/night_icon/1279.png';
import NIGHT1282 from '../../assets/icons/night_icon/1282.png';

// Icons
import { Feather } from '@expo/vector-icons';


export default function Home() {

    // States
    const [isReady, setIsReady] = useState(false);
    const [weatherData, setWeatherData] = useState([]);

    // Local Constants
    const PATH_TO_FILE_WITH_WEATHER_DATA = FileSystem.documentDirectory + 'weatherData.json';
    const NAVIGATION = useNavigation();
    const CALCULATING_STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : StatusBar.currentHeight;

    // The function of initial data loading when opening the application
    useEffect(() => {
        handleWriteFile();
        handleReadFile();
    }, []);

    // Updating weather data files every 5 minutes of using the app 
    useEffect(() => {
        const interval = setInterval(() => {
            handleWriteFile();
            handleReadFile();
        }, 300000);

        return () => clearInterval(interval);
    }, []);

    // Getting data for rendering components from a file every time there is a transition to the screen
    useEffect(() => {
        const unsubscribe = NAVIGATION.addListener('focus', () => {
            handleReadFile();
        });

        return unsubscribe;
    }, [NAVIGATION]);

    const timeOfDay = () => {
        const NOW = moment();
        const NIGHT_TIME_START = moment('21:00', 'HH:mm');
        const NIGHT_TIME_END = moment('06:00', 'HH:mm').add(1, 'd');
        const SUNRISE_TIME_START = moment('06:00', 'HH:mm');
        const SUNRISE_TIME_END = moment('09:00', 'HH:mm');
        const DAY_TIME_START = moment('09:00', 'HH:mm');
        const DAY_TIME_END = moment('21:00', 'HH:mm');

        if (NOW.isBetween(NIGHT_TIME_START, NIGHT_TIME_END)) {
            return NightTimeBackground;
        } else if (NOW.isBetween(SUNRISE_TIME_START, SUNRISE_TIME_END)) {
            return SunriseTimeBackground;
        } else if (NOW.isBetween(DAY_TIME_START, DAY_TIME_END)) {
            return DayTimeBackground;
        }
        
    }


    const date = new Date();
    const dayOfMonth = date.getDate();
    const monthName = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

    // The function of getting data from the API and writing it to a local file
    const handleWriteFile = async () => {
        try {
            fetch(`${FORECAST_TWODAYS_WEATHER_API_URI}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.forecast.forecastday[0].hour)
                const STOP_CYCLE = 2;
                const FORECASTDAY = data.forecast.forecastday;
                const TODAY_DAY = 0;
                const CURRENT_TIME = moment().format('H').replace(/^0+/, '');
                
                // Filtering hourly API data to display weather 24 hours ahead
                for(let FORECAST_DAY = TODAY_DAY; FORECAST_DAY < STOP_CYCLE; FORECAST_DAY++) {
                    let filtered = FORECASTDAY[FORECAST_DAY].hour.filter(function (el) {
                        if(FORECAST_DAY === TODAY_DAY) {
                            return el.time.split(" ")[1].split(":")[0] >= CURRENT_TIME;
                        }
                        return el.time.split(" ")[1].split(":")[0] <= CURRENT_TIME;
                    });
                    FORECASTDAY[FORECAST_DAY].hour = filtered;
                }
                FORECASTDAY[0].hour = [...FORECASTDAY[0].hour, ...FORECASTDAY[1].hour];
                FileSystem.writeAsStringAsync(PATH_TO_FILE_WITH_WEATHER_DATA, JSON.stringify(data));
            })
            .catch((error) => {
                console.error(error);
            });
        } catch(err) {
            console.log(err);
        } 
    }

    // Data and local file reading function
    const handleReadFile = async () => {
        const fileContents = await FileSystem.readAsStringAsync(PATH_TO_FILE_WITH_WEATHER_DATA);
        setWeatherData(JSON.parse(fileContents));
        setIsReady(true);
    }

    // Components
    const WeatherByHourComponent = ({currentTime, isDayOrNight, temperature, index, codeImage}) => {
        // Converting a string time value to AM/PM format
        const date = moment(`${currentTime}`, 'YYYY-MM-DD HH:mm').format('h A');

        const iconDefinition = () => {
            let a
            const result = obj.filter(obj => obj.key === codeImage);
            if(isDayOrNight === 0) {
                a = result[0].night_icon
            } else {
                a = result[0].day_icon
            }
            
            return <Image source={a} style={{width: 44, height: 44}} />
        }

        return (
            <View style={style.weatherHoursInfoContainer}>
                <Text style={style.weatherHoursInfoTime}>{index === 0 ? 'NOW' : date}</Text>
                {iconDefinition()}
                <Text style={style.weatherHoursInfoTemp}>{temperature}°C</Text>
            </View>
        );
    };

    const Separator = () => (
        <View style={{ width: 26 }} />
    );

    // Checking for loading data for rendering
    if (!isReady) {
        return null;
    }

    return (
        <View style={[style.contentWrapper, {paddingTop: CALCULATING_STATUSBAR_HEIGHT}]}>
            <View style={style.wrapper}>

                <View style={style.imgContainer}>
                    <ImageBackground source={timeOfDay()} resizeMode='cover' style={style.imgBackground}>
                        <View style={[style.imgTitleContainer, {display: 'flex', flexDirection: 'row'}]}>
                            <Text style={[style.imgTitle, {fontFamily: 'pop-sem'}]}>{dayOfMonth} {monthName}, </Text>
                            <Text style={style.imgTitle}>{dayOfWeek}</Text>
                        </View>
                        <View style={[style.imgTitleContainer, {alignItems: 'flex-end', marginBottom: 40}]}>
                            <Text style={[style.imgTitle, {fontFamily: 'pop-exbold', fontSize: 64, color: '#6E93FF'}]}>{weatherData && weatherData.current && weatherData.current.temp_c}°C</Text>
                            <Text style={[style.imgTitle, {fontFamily: 'pop-med', marginTop: -8, color: '#6E93FF'}]}>Real feel {weatherData.current.feelslike_c}°C</Text>
                        </View>
                        <View style={[style.imgTitleContainer, {display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}]}>
                            <Text style={[style.imgTitle, {fontFamily: 'pop-med'}]}>{weatherData.location.name}, {weatherData.location.country}</Text>
                            <Feather name="arrow-up-right" size={24} color="#FFF" />
                        </View>
                    </ImageBackground>
                </View>

                <View style={style.weatherParamsContainer}>
                    <View style={style.weatherParamBlock}>
                        <Feather name="wind" size={24} color="#FFFFFF" />
                        <Text style={style.weatherParamName}>Wind</Text>
                        <Text style={style.weatherParamTitle}>{weatherData.current.wind_kph} km/h</Text>
                    </View>
                    <View style={style.weatherParamBlock}>
                        <Feather name="thermometer" size={24} color="#FFFFFF" />
                        <Text style={style.weatherParamName}>Pressure</Text>
                        <Text style={style.weatherParamTitle}>{weatherData.current.pressure_mb} MB</Text>
                    </View>
                    <View style={style.weatherParamBlock}>
                        <Feather name="droplet" size={24} color="#FFFFFF" />
                        <Text style={style.weatherParamName}>Humidity</Text>
                        <Text style={style.weatherParamTitle}>{weatherData.current.humidity}%</Text>
                    </View>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={weatherData.forecast.forecastday[0].hour}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={({item, index}) => 
                        <WeatherByHourComponent
                            temperature={item.temp_c}
                            isDayOrNight={item.is_day}
                            currentTime={item.time}
                            index={index}
                            codeImage={item.condition.code}
                        />
                    }
                    ItemSeparatorComponent={Separator}
                    style={style.weatherHoursContainer}
                    contentContainerStyle={{ paddingHorizontal: '5%', justifyContent: 'space-between', overflow: 'hidden'}}
                />
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    // Main content containers
    contentWrapper: {
        flex: 1,
        backgroundColor: '#191D1E',
        alignItems: 'center'
    }, 
    wrapper: {
        width: '100%',
        height: '91.015625%',
        paddingHorizontal: '3.73%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 12
    }, 

    // Main block with picture
    imgContainer: {
        width: '100%',
        flex: 5.679,
        marginTop: 12,
        borderRadius: 40,
        overflow: 'hidden'
    },
    imgBackground: {
        flex: 1,
        paddingHorizontal: '5.7471%',
        paddingVertical: '5.0377%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    imgTitleContainer: {
        width: '100%',
        alignItems: 'center'
    },
    imgTitle: {
        fontFamily: 'pop-reg',
        color: '#FFFFFF',
        fontSize: 16,
        letterSpacing: 0.5
    },

    // Detailed weather parameters
    weatherParamsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        flex: 1.688,
        gap: 12
    },
    weatherParamBlock: {
        flex: 1,
        backgroundColor: '#6E93FF',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        justifyContent: 'center',
        paddingLeft: 12
    },
    weatherParamName: {
        fontFamily: 'nun-sem',
        color: '#FFFFFF',
        fontSize: 16
    },
    weatherParamTitle: {
        fontFamily: 'nun-reg',
        color: '#FFFFFF',
        fontSize: 13
    },

    // Forecast for 24 ahead
    weatherHoursContainer: {
        flex: 1.917,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 12,
        borderRadius: 40,
        backgroundColor: '#212325',
        borderWidth: 0,
        paddingVertical: 20      
    },
    weatherHoursInfoContainer: {
        width: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: -4
    },
    weatherHoursInfoTime: {
        fontFamily: 'nun-med',
        color: '#FFFFFF',
        fontSize: 10
    },
    weatherHoursInfoTemp: {
        fontFamily: 'nun-sem',
        color: '#FFFFFF',
        marginTop: 6,
        fontSize: 14  
    }
});