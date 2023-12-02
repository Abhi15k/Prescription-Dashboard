const pool = require("../../config/dbconfig");


module.exports  = {
    creates:(data, callBack) => {
        pool.query(
            `select * from city_master where id = ?`,
            [data.id],
            (err,results) =>{
                var date=new Date();
                var status="active";
                if(results == ""){
                    pool.query(
                        `INSERT INTO city_master(state_id,district_id,city_name,status,date) VALUES (?,?,?,?,?)`,
                         [
                            data.state_id,
                            data.district_id,
                            data.city_name,
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
            `select * from city_master where id = ?`,
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
            `select * from city_master`,
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
            `select * from city_master where  id = ?`,
            [
                
                id
            ],
            (err,results) =>{
                var date=new Date();
                var status="active";
                if(results == ""){
                    pool.query(
                        `UPDATE city_master SET state_id=?,district_id=?,city_name=?status=?,date=? WHERE  id = ?`,
                         [
                            data.state_id,
                            data.district_id,
                            data.city_name,
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
        pool.query(`delete from city_master where id=?`,
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
