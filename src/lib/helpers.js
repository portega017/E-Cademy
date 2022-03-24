const bcrypt = require('bcryptjs')

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); //para crear un hash --> ejecutar el algoritmo 10 veces, para más seguirdad
    const hash = await bcrypt.hash(password, salt); //cifrado
    return hash;
};

helpers.matchPassword = async (password, savedpassword) => {
    try {
        return await bcrypt.compare(password, savedpassword);

    } catch (e) {
        console.log(e);
    }

};

module.exports = helpers;




