const pool = require("../../config/dbconfig");


module.exports  = {
    creates:(data, callBack) => {
        
        pool.query(
            `select * from medicine where id = ?`,
            [data.id],
            (err,results) =>{
                var date=new Date();
                var status="active";
                if(results == ""){
                    pool.query(
                        `INSERT INTO medicine(medicine_id,no_of_days,timings,date,status,trackno) VALUES (?,?,?,?,?,?)`,
                         [
                            data.medicine_id,
                            data.no_of_days,
                            data.timings,
                            date,
                            status,
                            data.trackno
                         ],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                
                                    // pool.query(
                                    //     `INSERT INTO prescription(uid,doctor_id,date,status,price,trackno) VALUES (?,?,?,?,?,?)`,
                                    //      [
                                    //         data.uid,//user_email
                                    //         data.doctor_id,//doctor_email
                                    //         date,
                                    //         status,
                                    //         price,
                                    //         data.trackno
                                    //      ],
                                    //      (err,results) =>{
                                            
                                     return callBack(null, results);
                                 }
                                    // )
                                 
                             }
                        //  }
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
     createPresc:(data, callBack) => {

        var status="pending";
        var date=new Date();
        
            pool.query(
                    `INSERT INTO prescription(user_email,doctor_email,date,status,price,trackno) VALUES (?,?,?,?,?,?)`,
                     [
                        data.user_email,//user_email
                        data.doctor_email,//doctor_email
                        date,
                        status,
                        data.price,
                        data.trackno
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
                
            
         
                  
     },
     getsById:(id,callBack) => {
        pool.query(
            `select * from medicine where id = ?`,
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
     getsTrack:(trackno,callBack) => {
        var barCodeItems = "";
        pool.query(
            `SELECT * FROM prescription WHERE trackno = ? AND status = 'pending'`,
            [trackno],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                else if(results == ""){
                    err = "Data not found";
                    return callBack(err)
                }else{
                    barCodeItems = results;
                                var data  = {
                                    barCodeItems
                                }
                                return callBack(null, data);
                }
                
            }
        );
     },
     ViewPrescription:(trackno,callBack) => {
        var barCodeItems = "";
        pool.query(
            `SELECT * FROM medicine WHERE trackno = ? `,
            [trackno],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                else if(results == ""){
                    err = "Data not found";
                    return callBack(err)
                }else{
                    barCodeItems = results;
                                var data  = {
                                    barCodeItems
                                }
                                return callBack(null, data);
                }
                
            }
        );
     },
     //getting the products data
     gets:(callBack) => {
         pool.query(
            `select * from medicine`,
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
     UpdatedPrice:(data, trackno, callBack) => {
        var status="paid";
                    pool.query(
                        `UPDATE prescription SET status=?,price=? WHERE  trackno = ?`,
                         [
                            status,
                            data.price,
                            trackno
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
               
            },
                 
     
     deletesById:(id,callBack) => {
        pool.query(`delete from medicine where id=?`,
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
