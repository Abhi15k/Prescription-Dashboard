
const pool = require("../../config/dbconfig");

module.exports  = {
     createData:(data, callBack) => {
        pool.query(
            `select * from company_master where id = ?`,
            [data.id],
            (err,results) =>{
                var date=new Date();
                var status="active";
                if(results == ""){
                    pool.query(
                        `INSERT INTO company_master(company_name,company_address,company_contact,company_date,company_status) VALUES (?,?,?,?,?)`,
                         [
                            data.company_name,
                            data.company_address,
                            data.company_contact,
                            date,
                            status
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
     
     getData:(callBack) => {
         pool.query(
            `select * from company_master`,
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
     
    
     
};
