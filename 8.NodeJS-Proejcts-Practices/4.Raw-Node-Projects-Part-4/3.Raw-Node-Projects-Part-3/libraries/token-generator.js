const utitlities = {};

utitlities.createRandomToken = (length = 16) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    if (typeof length === 'number' && length > 0) {
        for (let i = 0; i < length; i += 1) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters.charAt(randomIndex);
        }
    }
    return token;
};
module.exports = utitlities;
