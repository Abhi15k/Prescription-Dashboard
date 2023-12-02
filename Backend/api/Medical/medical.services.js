const pool = require("../../config/dbconfig");


module.exports  = {
    creates:(data, callBack) => {
        pool.query(
            `select * from medical_master where email = ?`,
            [data.email],
            (err,results) =>{
                var date=new Date();
                var status="active";
                if(results == ""){
                    pool.query(
                        `INSERT INTO medical_master(first_name,last_name,email,contact,status,address,date) VALUES (?,?,?,?,?,?,?)`,
                        [
                           data.first_name,
                           data.last_name,
                           data.email,
                           data.contact,
                           status,
                           data.address,
                           date
   
                        ],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                   var status="active";
                                   var date=new Date();
                                   var user_type = "medical";
                                   var password = "medical" + Math.floor(Math.random() * 90000 + 10000);
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
            `select * from medical_master where id = ?`,
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
            `select * from medical_master`,
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
            `select * from medical_master where  id = ?`,
            [
                
                id
            ],
            (err,results) =>{
                var date=new Date();
                var status="active";
                if(results == ""){
                    pool.query(
                        `UPDATE medicine_master SET company_id=?,medicine_name=?,description=?,medicine_date=?,medicine_status=? WHERE  id = ?`,
                         [
                            data.company_id,
                            data.medicine_name,
                            data.description,
                            date,
                            status,
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
        pool.query(`delete from medical_master where id=?`,
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
