const pool = require("../../config/dbconfig");


module.exports  = {
    creates:(data, callBack) => {
        pool.query(
            `select * from complaint_master where id = ?`,
            [data.id],
            (err,results) =>{
                var date=new Date();
                var status="active";
                if(results == ""){
                    pool.query(
                        `INSERT INTO complaint_master(user_email,complaint_title,complaint_description,status,date) VALUES (?,?,?,?,?)`,
                         [
                            data.user_email,
                            data.complaint_title,
                            data.complaint_description,
                            status,
                            date
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
     getsById:(id,callBack) => {
        pool.query(
            `select * from complaint_master where id = ?`,
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
     gets:(callBack) => {
         pool.query(
            `select * from complaint_master`,
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
            `select * from complaint_master where  id = ?`,
            [
                
                id
            ],
            (err,results) =>{
                var date=new Date();
                var status="active";
                if(results == ""){
                    pool.query(
                        `UPDATE complaint_master SET company_id=?,medicine_name=?,description=?,medicine_date=?,medicine_status=? WHERE  id = ?`,
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
        pool.query(`delete from complaint_master where id=?`,
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
