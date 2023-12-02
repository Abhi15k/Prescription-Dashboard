const pool = require("../../config/dbconfig");


module.exports  = {
     creates:(data, callBack) => {
        pool.query(
            `select * from doctor_master where email = ?`,
            [data.email],
            (err,results) =>{
                var date=new Date();
                var status="active";
                if(results == ""){
                    pool.query(
                        `INSERT INTO doctor_master(first_name,last_name,specialization,email,contact,status,date) VALUES (?,?,?,?,?,?,?)`,
                         [
                            data.first_name,
                            data.last_name,
                            data.specialization,
                            data.email,
                            data.contact,
                            status,
                            date
                            
                         ],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                   var status="active";
                                   var date=new Date();
                                   var user_type = "doctor";
                                   var password = "doctor" + Math.floor(Math.random() * 90000 + 10000);
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
            `select * from doctor_master where id = ?`,
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
            `select * from doctor_master`,
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
     getPrescription:(email,callBack) => {
        pool.query(
            `select * from user_master where email = ?`,
            [email],
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
            `select * from doctor_master where  id = ?`,
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
        pool.query(`delete from doctor_master where id=?`,
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
