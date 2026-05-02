import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

interface AlertMessageOptions {
    title: string;
    message: string;
    position?: 'top' | 'bottom';
    visibilityTime: number;
}

const showInfo = ({ title, message, position = 'top', visibilityTime = 3000 }: AlertMessageOptions) => {
    Toast.show({
        type: 'customInfo',
        text1: title,
        text2: message,
        position,
        visibilityTime,
    })
}

const showSuccess = ({ title, message, position = 'top', visibilityTime = 3000 }: AlertMessageOptions) => {
    Toast.show({
        type: 'customSuccess',
        text1: title,
        text2: message,
        position,
        visibilityTime,
    })
}

const showError = ({ title, message, position = 'top', visibilityTime = 3000 }: AlertMessageOptions) => {
    Toast.show({
        type: 'customError',
        text1: title,
        text2: message,
        position,
        visibilityTime,
    })
}

export {showInfo, showSuccess, showError};