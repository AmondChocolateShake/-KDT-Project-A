const express=require('express');
const mysql = require('mysql');
const fs=require('fs');

// 데이터베이스 연결
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'Tarkov_Moding',
});



const app=express();
const port=3000;

// JSON 및 URL-encoded 데이터를 파싱하기 위한 미들웨어 등록
app.use(express.json());


//서버 오픈
app.listen(port,()=>{
  
  console.log('server is running now... (port:'+port+')');

});

//정적파일 서빙
app.use(express.static('../dist'));



app.post('/select_post',(req,res)=>{
  const id = req.body.id;
  const data = getPostData(id);
  console.log(data);
  res.json(data);
})




//Dev 페이지에서 아이템 객체 데이터 전송시 디비 삽입 처리
app.post('/data', (req, res) => {
  const item=req.body;
  console.log(item);
  connection.query('INSERT INTO item SET ?', item, (err, result) => {
    if (err) {
      console.error('Error inserting item into database:', err);
      res.status(500).json({ error: 'Failed to insert item into database' });
    } else {
      console.log('Item inserted into database:', result);
      res.status(200).json({ success: true });
    }
  });
});



/*데이터 db로 삽입하는 코드
// fs.readFile('../tarkov-data/itemList.json','utf8',
//   (err, data) => {
//     if (err) {
//       console.error('Error reading file:', err);
//       return;
//     }
//     try {
//       const itemList = JSON.parse(data);
//       for(let i=0;i<itemList.length;i++){
//         const data=itemList[i];
//         console.log(data);
        
          
//           connection.query('INSERT INTO item SET ?', data, (err, result) => {
//             if (err) {
//               console.error('Error inserting item into database:', err);
//             } else {
//               console.log('Item inserted into database:', result);
//             }
//           });
        

//       }

//     } catch (error) {
//       console.error('Error parsing JSON:', error);
//     }
  
// });
*/









  //게시글 데이터 가져오기
async function getPostData(id){
  const mysql=require('mysql');
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Tarkov_Moding',
  });
  console.log('id: '+id);
  //SELECT * FROM posts WHERE id = '5acf7dd986f774486e1281bf';
  const query = 'SELECT * FROM posts WHERE id = ?';
  const values = id;
  let data;


  try {
    const data = await new Promise((resolve, reject) => {
      connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    connection.end();
    console.log(data);
    return data;
  } catch (error) {
    connection.end();
    throw error;
  }


  // connection.query(query,values,(error, results) => {
  //   if (error) {
  //     throw error;
  //   }else{
  //     data=results;
  //   }
  // });

  // connection.end();
  
  // console.log(data);
  // return data;
  
}


// getPostData('5acf7dd986f774486e1281bf');
