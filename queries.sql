CREATE TABLE student (
  id SERIAL PRIMARY KEY,
  name TEXT,
  branch TEXT,
  program TEXT
);

CREATE TABLE faculty (
  id SERIAL PRIMARY KEY,
  name TEXT,
  department TEXT
);

CREATE TABLE course (
  id SERIAL PRIMARY KEY,
	student_id INTEGER REFERENCES student(id),
	faculty_id INTEGER REFERENCES faculty(id),
	student TEXT,
	code VARCHAR(10) NOT NULL,
	title TEXT NOT NULL,
	faculty TEXT,
	midsem_marks INT,
	endsem_marks INT,
	grade TEXT,
  registered BOOLEAN
);

CREATE TABLE coursedetail (
    id SERIAL PRIMARY KEY,
	faculty_id INTEGER REFERENCES faculty(id),
	code VARCHAR(10) NOT NULL,
	title TEXT NOT NULL,
	faculty TEXT,
	schedule TEXT,
	course_description VARCHAR(300),
  file_path TEXT
);

CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  faculty_id INTEGER REFERENCES faculty(id),
  student_id INTEGER REFERENCES student(id),
  code TEXT,
  student TEXT,
  faculty TEXT,
  attended BOOLEAN,
  date TEXT
);

CREATE TABLE coursefeedback(
  id SERIAL PRIMARY KEY,
  faculty_id INTEGER REFERENCES faculty(id),
  student_id INTEGER REFERENCES student(id),
  code TEXT,
  student TEXT,
  faculty TEXT,
  title TEXT,
  was_course_helpful BOOLEAN,
  faculty_rating INTEGER,
  feedback TEXT,
  button TEXT
);
