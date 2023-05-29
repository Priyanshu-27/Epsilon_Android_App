import AsyncStorage from "@react-native-async-storage/async-storage";

const StoreToken = async (value) => {
    try {
        const new_value = JSON.stringify(value)
        await AsyncStorage.setItem('token', new_value)
    } catch (error) {
        console.log(error);
    }
}

const getToken = async () => {
    try {

        const Token = await AsyncStorage.getItem('token')

        if (Token !== null) {
            return Token
        }
    } catch (error) {
        console.log(error);
    }
}

const removeToken = async () => {
    try {

        await AsyncStorage.removeItem('token')


    } catch (error) {
        console.log(error);
    }
}


const Store_S_ID = async (value) => {
    try {
        const new_value = JSON.stringify(value)
        await AsyncStorage.setItem('S_id', new_value)
    } catch (error) {
        console.log(error);
    }
}
const get_S_ID = async () => {
    try {

        const S_id = await AsyncStorage.getItem('S_id')

        if (S_id !== null) {
            return S_id
        }
    } catch (error) {
        console.log(error);
    }
}
const remove_S_ID = async () => {
    try {

        await AsyncStorage.removeItem('S_id')


    } catch (error) {
        console.log(error);
    }
}
const Store_Accept_id = async (value) => {
    try {
        const new_value = JSON.stringify(value)
        await AsyncStorage.setItem('Accept_id', new_value)
    } catch (error) {
        console.log(error);
    }
}
const get_Accept_id = async () => {
    try {

        const Accept_id = await AsyncStorage.getItem('Accept_id')

        if (Accept_id !== null) {
            return Accept_id
        }
    } catch (error) {
        console.log(error);
    }
}
const remove_Accept_id = async () => {
    try {

        await AsyncStorage.removeItem('Accept_id')


    } catch (error) {
        console.log(error);
    }
}
const Store_T_ID = async (value) => {
    try {
        const new_value = JSON.stringify(value)
        await AsyncStorage.setItem('T_id', new_value)
    } catch (error) {
        console.log(error);
    }
}
const get_T_ID = async () => {
    try {

        const T_id = await AsyncStorage.getItem('T_id')

        if (T_id !== null) {
            return T_id
        }
    } catch (error) {
        console.log(error);
    }
}
const remove_T_ID = async () => {
    try {

        await AsyncStorage.removeItem('T_id')


    } catch (error) {
        console.log(error);
    }
}
const Store_Room_Name = async (value) => {
    try {
        const new_value = JSON.stringify(value)
        await AsyncStorage.setItem('Room_Name', new_value)
    } catch (error) {
        console.log(error);
    }
}
const get_Room_Name = async () => {
    try {

        const Room_Name = await AsyncStorage.getItem('Room_Name')

        if (Room_Name !== null) {
            return Room_Name
        }
    } catch (error) {
        console.log(error);
    }
}
const remove_Room_Name = async () => {
    try {

        await AsyncStorage.removeItem('Room_Name')


    } catch (error) {
        console.log(error);
    }
}



const Store_Teacher_Name = async (value) => {
    try {
        const new_value = JSON.stringify(value)
        await AsyncStorage.setItem('Teacher_Name', new_value)
    } catch (error) {
        console.log(error);
    }
}


const get_Teacher_Name = async () => {
    try {

        const TeacherName = await AsyncStorage.getItem('Teacher_Name')

        if (TeacherName !== null) {
            return JSON.parse(TeacherName)
        }
    } catch (error) {
        console.log(error);
    }
}






export {
    StoreToken,
    removeToken,
    getToken,
    Store_S_ID, get_S_ID,
    remove_S_ID,
    Store_Accept_id,
    get_Accept_id,
    remove_Accept_id,
    remove_T_ID,
    Store_T_ID,
    get_T_ID,
    Store_Room_Name,
    get_Room_Name,
    remove_Room_Name,
    Store_Teacher_Name,
    get_Teacher_Name,
   
}