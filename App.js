import { useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { s } from "./App.style";
import hotBackground from "./assets/hot.png";
import { InputTemperature } from "./components/InputTemperature/InputTemperature";
import { TemperatureDisplay } from "./components/TemperatureDisplay/TemperatureDisplay";
import { DEFAULT_TEMPERATURE, DEFAULT_UNIT, UNITS } from "./constant";
import {
    getOppositeUnit,
    convertTemperatureTo,
} from "./services/temperature-services";
import {ButtonConvert} from "./components/ButtonConvert/ButtonConvert";

export default function App() {
    const [inputValue, setInputValue] = useState(DEFAULT_TEMPERATURE);
    const [currentUnit, setCurrentUnit] = useState(DEFAULT_UNIT);
    const oppositeUnit = getOppositeUnit(currentUnit);

    function getConvertedTemperature() {
        const valueAsFloat = Number.parseFloat(inputValue);
        return isNaN(valueAsFloat)
            ? ""
            : convertTemperatureTo(oppositeUnit, valueAsFloat).toFixed(1);
    }

    return (
        <ImageBackground source={hotBackground} style={s.container}>
            <View style={s.workspace}>
                <TemperatureDisplay
                    value={getConvertedTemperature()}
                    unit={oppositeUnit}
                />
                <InputTemperature
                    onChangeText={setInputValue}
                    defaultValue={DEFAULT_TEMPERATURE}
                />
                <View>
                    <ButtonConvert
                        onPress={() => {
                            setCurrentUnit(oppositeUnit);
                        }}
                        unit={currentUnit}
                    />
                </View>
            </View>
        </ImageBackground>
    );
}

