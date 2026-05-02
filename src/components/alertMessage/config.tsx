import { View, Text } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';

interface AlertMessageConfig {
    title: string;
    message: string;
}

export default {
    customError: (props: ToastConfigParams<any>) => (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{props.text1}</Text>
            <Text style={{ fontSize: 16 }}>{props.text2}</Text>
        </View>
    ),

    customSuccess: (props: ToastConfigParams<any>) => (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{props.text1}</Text>
            <Text style={{ fontSize: 16 }}>{props.text2}</Text>
        </View>
    ),

    customInfo: (props: ToastConfigParams<any>) => (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{props.text1}</Text>
            <Text style={{ fontSize: 16 }}>{props.text2}</Text>
        </View>
    ),
}