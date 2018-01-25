const saveUserData = (value) => {
    const dataObj = JSON.stringify(value);
    localStorage.setItem('userData', dataObj);
}

const getUserData = async () => {
    return await localStorage.getItem('userData');
}

const Storage = {
    saveUserData: saveUserData,
    getUserData: getUserData
}

export default Storage;
