import React, {useEffect, useCallback, useState} from 'react'
import { StyleSheet, View, Text, Image, Platform, FlatList, ImageBackground, Button, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import * as FileSystem from 'expo-file-system';
import BackgroundImage from '../../assets/img/background.png'
import { useNavigation } from '@react-navigation/native';
import { FORECAST_ONEDAY_WEATHER_API_URI, BASE_FILE_NAME } from '../Constants/Constants.js'
import moment from 'moment';


// Import Icons
import { Feather } from '@expo/vector-icons';


export default function Home() {

    const [isReady, setIsReady] = useState(false);

    const PATH_TO_FILE = FileSystem.documentDirectory + 'weatherData.json';
    const navigation = useNavigation();

    const [weatherData, setWeatherData] = useState([])


    const date = new Date();
    const dayOfMonth = date.getDate();
    const monthName = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

    const handleWriteFile = async () => {
        try {
            fetch(`${FORECAST_ONEDAY_WEATHER_API_URI}`)
            .then((response) => response.json())
            .then((data) => {
                FileSystem.writeAsStringAsync(PATH_TO_FILE, JSON.stringify(data))
                .catch((error) => {
                    console.error(error);
                });
            })
            .catch((error) => {
                console.error(error);
            });
        } catch(err) {
            console.log(err)
        } 
    }

    const readFile = async () => {
        const fileContents = await FileSystem.readAsStringAsync(PATH_TO_FILE);
        setWeatherData(JSON.parse(fileContents))
        setIsReady(true)
    }

    useEffect(() => {
        handleWriteFile()
        readFile()
        console.log('Монтирование ')
      }, [])

    useEffect(() => {
        console.log('Монтирование с таймаутом')
        const interval = setInterval(() => {
            handleWriteFile()
            readFile()
        }, 60000);
        return () => clearInterval(interval);
      }, []);





    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          readFile()
          console.log('DATA:   ', weatherData)
        });
    
        return unsubscribe;
      }, [navigation]);

    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : StatusBar.currentHeight;

    const Block = ({hour, isDay, temp}) => {
        const date = moment(`${hour}`, 'YYYY-MM-DD HH:mm').format('h A');

        return (
        <View style={style.weatherHoursInfoContainer} >
            <Text style={style.weatherHoursInfoTime}>{date}</Text>
            {isDay === 0 ? <Feather name="moon" size={24} color="#FFFFFF" /> : <Feather name="sun" size={24} color="#FFFFFF" />}
            <Text style={style.weatherHoursInfoTemp}>{temp}°C</Text>
        </View>
    )};

    const Separator = () => (
        <View style={{ width: 26 }} />
    );

    // const WEATHER_BY_HOUR_DATA = weatherData.forecast.forecastday[0].hour

    if (!isReady) {
        return null;
      }

    return (
        <View style={[style.contentWrapper, {paddingTop: STATUSBAR_HEIGHT}]}>
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
                    renderItem={({item, index}) => <Block temp={item.temp_c} isDay={item.is_day} hour={item.time} />}
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
        gap: 3
    },
    weatherHoursInfoTime: {
        fontFamily: 'nun-med',
        color: '#FFFFFF',
        fontSize: 10,
        
    },
    weatherHoursInfoTemp: {
        fontFamily: 'nun-sem',
        color: '#FFFFFF',
        marginTop: 4,
        fontSize: 14,
        
    },
})

