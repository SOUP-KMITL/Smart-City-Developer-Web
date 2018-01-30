const saveUserData = (value) => {
    const dataObj = JSON.stringify(value);
    localStorage.setItem('userData', dataObj);
}

const getUserData = async () => {
    const userData =  await localStorage.getItem('userData');
    return JSON.parse(userData);
}

const removeUserData = async () => {
    await localStorage.removeItem('userData');
}

// -------------------------------------------- //

const Storage = {
    saveUserData: saveUserData,
    getUserData: getUserData,
    removeUserData: removeUserData,
}

export default Storage;
