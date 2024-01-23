const utilities = {};

utilities.parseJSON = (passedString) => {
    let jsonObject = {};
    try {
        jsonObject = JSON.stringify(passedString);
    } catch (error) {
        jsonObject = {};
    }
    return jsonObject;
};
module.exports = utilities;
