const {DataTypes,Sequelize}=require("sequelize");

module.exports=(sequelize)=>{
    sequelize.define('task',{
        id:{type:DataTypes.UUID,primaryKey:true,allowNull:false,defaultValue:Sequelize.UUIDV4},
        name:{type:DataTypes.STRING,defaultValue:'(Nameless task)',allowNull:false},
        description:{type:DataTypes.STRING,allowNull:false,defaultValue:'()',set(desc){this.setDataValue('description',desc)}},
        creationDate:{type:DataTypes.DATE, allowNull:true,defaultValue:DataTypes.NOW},//ojito con los usos horarios
        finishDate:{type:DataTypes.DATE, allowNull:true,set(date){this.setDataValue('finishDate',date)}},
        status:{type:DataTypes.ENUM({values:['Pending','In progress','Success','Canceled','Expired']}),
        defaultValue:'Pending',allowNull:false},
        limitTime:{type:DataTypes.FLOAT,allowNull:true,defaultValue:30},
        actualTime:{type:DataTypes.FLOAT,allowNull:true,defaultValue:0},
        grade:{type:DataTypes.INTEGER,allowNull:true,defaultValue:3},
        order:{type:DataTypes.INTEGER,unique:true,autoIncrement:true}
    })
}