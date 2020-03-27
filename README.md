# FathersUnited
Concept work for Fathers United non profit. This site should have two sides. Public side where visitors can get general information, review events. Secure side where fathers can talk, learn skills, and get support. The public side is a static site with a single app feel. Links are handled typical server side. The secure side will be a combo of profile, think linkedin, and school. School section will use online resources until in house can be made. Advantage here is these resources are gathered in one place and organized.

## Frontend
### 3/27/20
reworked and tweeked features on the home page. Installed a more prominent header for the percentage section of the header. Wrote some more into for that section for clearer focus. Created the merch section, currently in html. I may change that section to react later. Not currently connected to any pay system. Ensured mobile compliance. Two screen sizes. max-width 450px and max-width 768px. Had issues with header and nav at 360 px range. Issue resolved.

## Backend
Using NodeJS, and express to start the backend. Using Mongoose for the database. Using heroku to deploy the backend. Currently using Zeit for the static site.

#### Assist 
Traversy Media MERN stack course on back end. Original course config re wrote to fit current needs.

### 3/4/20
* Added the counter functionality to the numbers section.
* Moved the sections around for better flow.

### 3/25/20
* Finished backend for profile. Users can register, login - 
* Profile includes {
    * first name - profile first name
    * last name - profile last name
    * address - profile address **private** to profile, DO NOT USE NOW
    * city - profile city
    * state - profile state
    * mobile - profile mobile number
    * status - profile status like seperated, devorced, 
    * bio - profile short bio
    * skills - profile skills **- can add but will gain as go through skills courses

    social like youtube, twitter, instagram, facebook, linkedin
},
* Experience: {
    * title - title held
    * company - company worked at
    * location - location of job
    * from - started job
    * to - ended job
    * current - are you currently employed here
    * description - idea of duties performed
},
* education: {
    * school - name of school
    * degree - degree, diploma, cert received
    * field of study - what was the focus
    * from - when did you start
    * to - when did you graduate
    * current - are you in school
    * description - what did you or are you learning
},
* working on post endpoints

### 3/26/20
* completed endpoints for makeing posts. User can create and delete posts. Like and unlike posts. Comment and delete comments.
* ### review for update


