const saveUserData = (value) => {
    const dataObj = JSON.stringify(value);
    localStorage.setItem('userData', dataObj);
}

const getUserData = async () => {
    const userData =  await localStorage.getItem('userData');
    return JSON.parse(userData);
}

const saveAccessData = (value) => {
    const dataObj = JSON.stringify(value);
    localStorage.setItem('accessData', dataObj);
}

const getAccessData = async () => {
    const accessData = await localStorage.getItem('accessData');
    return JSON.parse(accessData);
}

const Storage = {
    saveUserData: saveUserData,
    getUserData: getUserData,
    saveAccessData: saveAccessData,
    getAccessData: getAccessData
}

export default Storage;
