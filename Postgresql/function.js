const pg = require("pg");

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "iris",
    password: "ilovewebd",
    port: 5432,
  });
  db.connect();

  const x1 = async(name,program,department)=>{
    await db.query("INSERT INTO student (name,program,branch) VALUES ($1,$2,$3)", [name,program,department]);
  }

  const x2 = async()=>{
    const result = await db.query("SELECT code,title FROM coursedetail;");
           return items = result.rows;
  }

  const x3 = async(code1)=>{
    const d1 = await db.query("SELECT * FROM coursedetail WHERE code=$1",[code1]);
           return item1 = d1.rows;
  }

  const x4 = async(current_student_id)=>{
    const d3 = await db.query("SELECT * FROM student WHERE id=$1",[current_student_id]);
          return item3 =d3.rows;
  }

  const x5 = async(a,b,c,d,e,f)=>{
    await db.query("INSERT INTO course (title,code,faculty_id,faculty,student_id,student) VALUES ($1,$2,$3,$4,$5,$6)", [a,b,c,d,e,f]);
  }

  const x6 = async()=>{
    const result = await db.query("SELECT * FROM coursedetail ORDER BY id ASC");
         return items = result.rows;
  }

  const x7 = async()=>{
    const result1 = await db.query("SELECT * FROM faculty ORDER BY id ASC")
         return  items1 = result1.rows;
  }

  const x8 = async(course)=>{
    const result = await db.query("SELECT * FROM student JOIN course ON student.id = course.student_id WHERE code=($1)",[course]);
    return items = result.rows;
  }

  const x9 = async(faculty)=>{
    const result= await db.query("SELECT id FROM faculty WHERE name=($1)",[faculty]);
        return items = result.rows;
  }

  const x10 = async(a,b,c,d,e)=>{
    await db.query("INSERT INTO coursedetail (title,code,faculty_id,faculty,schedule) VALUES ($1,$2,$3,$4,$5)", [a,b,c,d,e]);
  }

  const x11 = async(code)=>{
    await db.query("DELETE FROM coursedetail WHERE code=($1)", [code]);
  }

  const x12 = async(course)=>{
    const result = await db.query("SELECT * FROM student JOIN course ON student.id = course.student_id WHERE code=($1)",[course]);
        return  items = result.rows;
  }

  const x13 = async(current_faculty_id)=>{
    const result = await db.query("SELECT * FROM coursedetail WHERE faculty_id=($1)",[current_faculty_id]);
        return items = result.rows;
  }

 

  const x14 = async(course)=>{
    const result = await db.query("SELECT * FROM student JOIN course ON student.id = course.student_id WHERE code=($1)",[course]);
       return items = result.rows;
  }

  const x15 = async(code1)=>{
    const result = await db.query("SELECT * FROM student JOIN course ON student.id = course.student_id WHERE code=($1)",[code1]);
     return items = result.rows;
  }

  const x16 = async(course)=>{
    const result = await db.query("SELECT * FROM student JOIN course ON student.id = course.student_id WHERE code=($1)",[course]);
      return  items = result.rows;
  }

  const x17 = async(a,b,c,d)=>{
    await db.query("INSERT INTO course (student_id,registered,code,title) VALUES ($1,$2,$3,$4)",[a,b,c,d]);
  }

  const x18 = async(name,department)=>{
    await db.query("INSERT INTO faculty (name,department) VALUES ($1,$2)", [name,department]);
  }

  const x19 = async(code,name)=>{
    await db.query("DELETE FROM course WHERE code=($1) AND student=($2)", [code,name]);
  }

  const x20 = async(a)=>{
    await db.query("UPDATE course SET registered=true WHERE code=($1)",[a]);
  }

  const x21 = async(current_faculty_id)=>{
    const result = await db.query("SELECT * FROM course WHERE student_id=($1)",[current_faculty_id]);
      return  items = result.rows;
  }

  const x22 = async(id,code)=>{
    const result = await db.query("SELECT * FROM course WHERE student_id=($1) AND code=($2)",[id,code]);
      return  items = result.rows;
  }

  const x23 = async(a,b,c)=>{
    await db.query("UPDATE course SET midsem_marks=($1) WHERE code=($2) AND student=($3)",[a,b,c]);
  }

  const x24 = async(a,b,c)=>{
    await db.query("UPDATE course SET endsem_marks=($1) WHERE code=($2) AND student=($3)",[a,b,c]);
  }

  const x25 = async(a,b,c)=>{
    await db.query("UPDATE course SET grade=($1) WHERE code=($2) AND student=($3)",[a,b,c]);
  }

  const x26 = async(a,b)=>{
    await db.query("UPDATE coursedetail SET course_description=($1) WHERE code=($2)",[a,b]);
  }

  const x27 = async(a,b,c,d,e,f)=>{
    await db.query("INSERT INTO attendance (faculty_id,student_id,student,faculty,code,date) VALUES ($1,$2,$3,$4,$5,$6)",[a,b,c,d,e,f]);
  }

  const x28 = async(date,code)=>{
    const result = await db.query("SELECT * FROM attendance WHERE date=($1) AND code=($2)",[date,code]);
      return  items = result.rows;
  }

  const x29 = async(a,b,c)=>{
    await db.query("UPDATE attendance SET attended=true WHERE code=($1) AND student=($2) AND date=($3)",[a,b,c]);
  }

  const x30 = async(a,b,c)=>{
    await db.query("UPDATE attendance SET attended=false WHERE code=($1) AND student=($2) AND date=($3)",[a,b,c]);
  }

  const x31 = async(id,code)=>{
    const result = await db.query("SELECT * FROM attendance WHERE student_id=($1) AND code=($2)",[id,code]);
      return  items = result.rows;
  }

  const x32 = async(id,code)=>{
    const result = await db.query("DELETE FROM course WHERE student_id=($1) AND code=($2)",[id,code]);
      return  items = result.rows;
  }
  
  const x33 = async(a,b)=>{
    await db.query("UPDATE coursedetail SET file_path=($1) WHERE code=($2)",[a,b]);
  }
  

  module.exports={x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17,x18,x19,x20,x21,x22,x23,x24,x25,x26,x27,x28,x29,x30,x31,x32,x33};