# IRIS (Course Registration) Task-02

This task is designed to empower users with the ability to select, enroll, and manage their course schedules seamlessly.

->Video link:https://youtu.be/AWQ8bs-UEus?si=MC0MUmIPBo1ptUFF


## Installation Steps:

1. Install nodejs and npm on your device.

2. Clone the repository to your local system.

3. Create a '.env' file in the root folder to add your token and other private things.

4. Installation Instructions for PostgreSQL and pgAdmin:

-> Windows Users: Download the Postgres Installer here:

https://sbp.enterprisedb.com/getfile.jsp?fileid=1258649

->1. Mac Users: Download the Postgres Installer here:

https://sbp.enterprisedb.com/getfile.jsp?fileid=1258653

->Double click on the downloaded file to start the installer.

-> Click Next to continue through the installer, until you reach   'Select Components' and make sure that everything is selected especially pgAdmin.

->Continue clicking Next until you reach 'Password'. Your superuser username is postgres and you need to set a password. Make sure you write this password down (i have disclosed my password anyway i am going to delete that server).

->Create a database named  iris in the server that you have created.

->Add the username and password in the code which is in the folder PostgreSQL.

5. Comment out all the lines where API tokens are used or create API tokens ->TWILIO TOKEN (for sending text message),Google app password for nodemailer (for sending mail),GOOGLE Auth client-ID and TOKEN(for logging in through google account).

6. Replace all the places with your tokens in place of mine.

7. Create a MongoDB Atlas server and get the MongoDB uri ,paste that in my code or install mongodb in your device and connect locally.





    
## Deployment

To deploy this project run

1. Open up the command terminal from the root directory and type to install all the packages.




```bash
  npm i 
```
2. Type the below command to run the server.


```bash
  nodemon index.js
```

3. Register the admin (i will remove register option,for now i just kept it for salting and hasing the password).


## List of implemented features(All the specified features are implemented along with bonus)

1. You can login as Student,Faculty and Admin to access the course registration system.
2. Upon login, students can view all available courses.
3. Students can search for courses by code, title.
4. They can select desired courses and register for the course.
5. Admin can add new courses to the system.
6. Set available slots for each course.
7. Specify prerequisites and additional course details (Basically the description).
8. Students can submit their course selections.
9. Next, the system forwards this request to the course instructor.
10. The instructor gets the list of students who have shown interest, and can choose whether to enroll them or drop them.
11. The website is authenticated and authorized too.(once you restart or logout it takes you to the login page). 
12. Functions of each role 

->Admin

a. Admin can view all courses, student enrollments.

b.  Add/Remove courses.

c.  Manage faculty details and assignments.

->Faculty

a. Instructors can access courses they're teaching.

b. View enrolled students.

->Student

a. Students can view all courses, and choose to get enrolled.

b. Check course schedules.

c. Drop courses within the specified deadline.

12.Bonus Tasks :

-> student can see grades section where they can see the marks and grades on different tests(Midsem and Endsem for now).

->Students get automated emails or notifications for enrollment of courses.

->Students can submit feedback or ratings for completed courses.

## Additional feature :

->Faculty can take attendance by selecting the specific date.

->Students can see attendance percentage.

->Students can also see the number of leaves they have or number of classes they should attend(Similar to actual IRIS feature).

## List of known bugs :

->Students can give multiple course feedbacks but i have given the feature to delete them so that they can keep only one.

->On smaller screen, the UI breaks.

->Not a bug but yeah the codes could have been made even more modular(that i can do anytime).

## References :

->Stack Overflow

->W3School

->Mongoose-npm

->Node-mailer-npm

->Twilio-website

->Medium articles

## Screenshots :

->Add iris Database

![Screenshot 2024-01-12 215359](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/ab990b04-a3af-4838-b43d-0df59a07b376)

->First page

![Screenshot (283)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/48ad381b-84f5-4c04-912d-e10102c9b7cf)

->Student page

![Screenshot (284)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/f7f9d053-a2be-4a8e-82c2-242c5274073f)

->Admin's first page

![Screenshot (286)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/faee3fde-41d9-46e0-b17f-067411ce253d)

->Student login page

![Screenshot (287)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/1bb68aa7-f139-419e-b7f0-50e29142cfc5)

->Student's first page

![Screenshot (288)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/2f6c5155-d931-44a0-9a3a-4041dca47549)

->Course registration page of student

![Screenshot (289)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/0d95259f-d5d1-49a8-96fb-fb9056d8b1d8)

->Student page after course registration

![Screenshot (290)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/69586c1f-5ec2-4660-a662-2f90109b50bf)

->Faculty's courses page

![Screenshot (291)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/a3ec1ec3-df2e-4dde-a505-55f236f6a6dd)

->Faculty's course details page

![Screenshot (292)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/941fb820-b8ed-4724-bc27-a1c1e01c4690)

->Faculty's course approval page

![Screenshot (293)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/f77ec11f-e497-4a01-b793-14e05f9090ea)

Faculty's marks upload page

![Screenshot (294)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/85a13e70-1b77-4e1f-856b-27620ce52e67)

->Faculty's attendance feature

![Screenshot (295)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/6a9d283c-6229-49ba-ad7a-8d1a93560977)


![Screenshot (296)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/d7da9386-123f-4575-bd40-49efeab715ca)

->Student's course drop page

![Screenshot (297)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/c962e8d6-1fb5-4c04-b287-2da625b20c76)

->Student's course details page

![Screenshot (298)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/c9d507c2-ec17-455d-a56e-e90fe12a42e7)

Student's view attendance page

![Screenshot (299)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/81f82c49-9fbc-4ccc-a588-80abf77e6f93)


![Screenshot (300)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/0ffaa65b-a875-4042-9667-a5d812d0a937)

->Student's course feedback page

![Screenshot (301)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/ed7aca88-75a4-4f45-9c4d-aaaba133d50d)


