const bcrypt = require('bcrypt');
async function hashIt(password){
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password.toString(), salt);
  return hashed;
}


const compare = async (password) =>{
    const salt = await bcrypt.genSalt(12)
    const hashed = await bcrypt.compare(password, salt);
    return hashed;

}

module.exports = {
    hashIt,
    compare
}