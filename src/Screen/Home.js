import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, FlatList, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as FileSystem from 'expo-file-system';
import moment from 'moment';

// Constants
import { FORECAST_ONEDAY_WEATHER_API_URI } from '../Constants/Constants.js';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Images
import BackgroundImage from '../../assets/img/background.png'

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


    const date = new Date();
    const dayOfMonth = date.getDate();
    const monthName = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

    // The function of getting data from the API and writing it to a local file
    const handleWriteFile = async () => {
        try {
            fetch(`${FORECAST_ONEDAY_WEATHER_API_URI}`)
            .then((response) => response.json())
            .then((data) => {
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
    const WeatherByHourComponent = ({currentTime, isDayOrNight, temperature}) => {
        // Converting a string time value to AM/PM format
        const date = moment(`${currentTime}`, 'YYYY-MM-DD HH:mm').format('h A');

        return (
        <View style={style.weatherHoursInfoContainer} >
            <Text style={style.weatherHoursInfoTime}>{date}</Text>
            {isDayOrNight === 0 ? <Feather name="moon" size={24} color="#FFFFFF" /> : <Feather name="sun" size={24} color="#FFFFFF" />}
            <Text style={style.weatherHoursInfoTemp}>{temperature}°C</Text>
        </View>
    )};

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
                    <ImageBackground source={BackgroundImage} resizeMode='cover' style={style.imgBackground}>
                        <View style={[style.imgTitleContainer, {display: 'flex', flexDirection: 'row'}]}>
                            <Text style={[style.imgTitle, {fontFamily: 'pop-sem'}]}>{dayOfMonth} {monthName}, </Text>
                            <Text style={style.imgTitle}>{dayOfWeek}</Text>
                        </View>
                        <View style={[style.imgTitleContainer, {alignItems: 'flex-end', marginBottom: 40}]}>
                            <Text style={[style.imgTitle, {fontFamily: 'pop-exbold', fontSize: 64}]}>{weatherData && weatherData.current && weatherData.current.temp_c}°C</Text>
                            <Text style={[style.imgTitle, {fontFamily: 'pop-med', marginTop: -8}]}>Real feel {weatherData.current.feelslike_c}°C</Text>
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
                    data={weatherData.forecast.forecastday[0].hour}
                    renderItem={({item, index}) => 
                        <WeatherByHourComponent temperature={item.temp_c} isDayOrNight={item.is_day} currentTime={item.time} />
                    }
                    keyExtractor={(_, i) => i.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={style.weatherHoursContainer}
                    contentContainerStyle={{ paddingHorizontal: '5%', justifyContent: 'space-between', overflow: 'hidden'}}
                    centerContent={false}
                    ItemSeparatorComponent={Separator}
                />
            </View>
            {/* <Text>{weatherData && weatherData.current && weatherData.current.temp_c}</Text> */}
        </View>
    );
};

const style = StyleSheet.create({
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

    weatherHoursContainer: {
        // width: '100%',
        flex: 1.917,
        display: 'flex',
        flexDirection: 'row',

        marginBottom: 12,
        borderRadius: 40,
        backgroundColor: '#212325',
        borderWidth: 0,
        paddingVertical: 20,        
    },
    weatherHoursInfoContainer: {
        width: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    weatherHoursInfoTime: {
        fontFamily: 'nun-med',
        color: '#FFFFFF',
        fontSize: 10,
        
    },
    weatherHoursInfoTemp: {
        fontFamily: 'nun-sem',
        color: '#FFFFFF',
        marginTop: 6,
        fontSize: 14,
        
    },
})

