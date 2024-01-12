# IRIS (Course Registration) Task-02

This task is designed to empower users with the ability to select, enroll, and manage their course schedules seamlessly.


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

3. Type the below command to run the server.
4. Register the admin (i will remove register option,for now i just kept it for salting and hasing the password).


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
11. Functions of each role 
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

->On smaller screen, the UI breaks

## References :

->Stack Overflow

->W3School

->Mongoose-npm

->Node-mailer-npm

->Twilio-website

->Medium articles

## Screenshots :

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

![Screenshot (283)](https://github.com/PranavSimhaN/IRIS_Rec23_221EC238_Express-Node-js/assets/141490957/48ad381b-84f5-4c04-912d-e10102c9b7cf)

