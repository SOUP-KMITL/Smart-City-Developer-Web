const saveUserData = (value) => {
    const dataObj = JSON.stringify(value);
    localStorage.setItem('userData', dataObj);
}

const getUserData = async () => {
    return await localStorage.getItem('userData');
}

const saveAccessData = (value) => {
    const dataObj = JSON.stringify(value);
    localStorage.setItem('accessData', dataObj);
}

const getAccessData = async () => {
    return await localStorage.getItem('accessData');
}

const Storage = {
    saveUserData: saveUserData,
    getUserData: getUserData,
    saveAccessData: saveAccessData,
    getAccessData: getAccessData
}

export default Storage;
