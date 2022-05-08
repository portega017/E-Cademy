const bcrypt = require('bcryptjs')
const pool = require('../database')

const helpers = {};
helpers.isAdmin=async(id_rol)=>{
    const rows =  await pool.query('SELECT * FROM users WHERE id_rol =  ?',[id_rol]);
    long=rows.length
    for(var i=0;i=long;i++){
        if (id_rol==1){
            return true;
        }else{
            return false;
        }
    }

}
helpers.isStudent=async(id_rol)=>{
    const rows =  await pool.query('SELECT * FROM users WHERE id_rol =  ?',[id_rol]);
    long=rows.length
    for(var i=0;i=long;i++){
        if (id_rol==3){
            return true;
        }else{
            return false;
        }
    }

}
helpers.isNotAdmin=async(id_rol)=>{
    const rows =  await pool.query('SELECT * FROM users WHERE id_rol =  ?',[id_rol]);
    long=rows.length
    for(var i=0;i=long;i++){
        if (id_rol!=1){
            return true;
        }else{
            return false;
        }
    }

}

helpers.isTeacher=async(id_rol)=>{
    const rows =  await pool.query('SELECT * FROM users WHERE id_rol =  ?',[id_rol]);
    long=rows.length
    for(var i=0;i=long;i++){
        if (id_rol==2){
            return true;
        }else{
            return false;
        }
    }

}

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




