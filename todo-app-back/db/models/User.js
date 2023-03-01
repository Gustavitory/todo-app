const {DataTypes,Sequelize}=require('sequelize');
const bcrypt=require('bcrypt');


module.exports=(sequelize)=>{
    const User=sequelize.define('user',{
         id:{type:DataTypes.UUID,primaryKey:true,defaultValue:Sequelize.UUIDV4,allowNull:false},
         password:{type:DataTypes.STRING(64),allowNull:false},
         userName:{type:DataTypes.STRING(64),allowNull:false}
    },{
        hooks:{
            beforeCreate:(user)=>{
                const salt=bcrypt.genSaltSync(parseInt(process.env.HASH_NUMBER));
                user.password=bcrypt.hashSync(user.password,salt);
            }
        }
    }
    )
    //asi es como se crea un metodo dentro de un modelo de sequelize
    User.prototype.validPassword=async function(password){
        return await bcrypt.compare(password, this.password);
    }
    return User;
}