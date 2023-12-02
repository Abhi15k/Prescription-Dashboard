const pool = require("../../config/dbconfig");


module.exports  = {
     creates:(data, callBack) => {
        pool.query(
            `select * from user_master where email = ?`,
            [data.email],
            (err,results) =>{
                var date=new Date();
                var status="active";
                if(results == ""){
                    pool.query(
                        `INSERT INTO user_master(first_name,last_name,gender,email,contact,date_of_birth,date,status,blood_pressure,pulse,blood_group,height,weight,city_id,state_id,district_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                         [
                            data.first_name,
                            data.last_name,
                            data.gender,
                            data.email,
                            data.contact,
                            data.date_of_birth,
                            date,
                            status,
                            data.blood_pressure,
                            data.pulse,
                            data.blood_group,
                            data.height,
                            data.weight,
                            data.city_id,
                            data.state_id,
                            data.district_id
                         ],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                   var status="active";
                                   var date=new Date();
                                   var user_type = "user";
                                   var password = "user" + Math.floor(Math.random() * 90000 + 10000);
                                pool.query(
                                    `INSERT INTO login_master(user_name,user_email,user_type,user_password,status,date ) VALUES (?,?,?,?,?,?)`,
                                    [
                                        data.first_name,
                                        data.email,
                                        user_type,
                                        password,
                                        status,
                                        date
                                    ],
                                    (error)=> {
                                        if(error){
                                            return callBack(error);
                                        }else{
                                            message = {
                                                student_email:data.student_email,
                                                password:password
                                            };
                                            return callBack(null,message);
                                        }
                                    }                                    
                                );
                                
                           }

                         }
                     );
                }else if(err){
                    return callBack(err);
                }else{
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
         ); 
                  
     },
     getsById:(id,callBack) => {
        pool.query(
            `select * from user_master where id = ?`,
            [id],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                else if(results == ""){
                    err = "Data not found";
                    return callBack(err)
                }else{
                    return callBack(null, results);
                }
                
            }
        );
     },
     //getting the products data
     gets:(callBack) => {
         pool.query(
            `select * from user_master`,
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){
                    err = "Data Not Found";
                    return callBack(err);
                }else{
                    return callBack(null, results);
                }

            }
         );
     },
     updates:(data, id, callBack) => {
        pool.query(
            `select * from user_master where  id = ?`,
            [
                
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE student SET student_name=?,student_email=?,student_contact=?,student_image=?,balance=?,student_status=? WHERE  id = ?`,
                         [
                            data.student_name,
                            data.student_email,
                            data.student_contact,
                            data.student_image,
                            data.balance,
                            data.student_status,
                            id
                         ],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                 return callBack(null, results);
                             }
                         }
                     );
                }else if(err){
                    return callBack(err);
                }else{
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
         );         
     },
     deletesById:(id,callBack) => {
        pool.query(`delete from user_master where id=?`,
            [ 
                id
            ],        
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){                    
                    return callBack("Data not found");
                }else{  
                    message = "Data deleted successfully";
                    return callBack(null, message);
                }
            }
    );
     },    
};
