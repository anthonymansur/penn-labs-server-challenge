To whom it may concern:

Welcome to my attempt at the Penn Lab's fall-2018 server challenge.

The link to this challenge can be found here:
https://www.notion.so/Server-Challenge-Fall-18-057cb31ac6744f7696a4860a8f861e50 

This challenge was attempted using Node and Express, with a front-end component
added using React. 

To start, run the command node index.js on the SERVER-CHALLENGE-FALL-2018 folder 
and on a new window, cd to the client folder and run yarn start.

The server will be running on port 8080 and the client on port 3000.


Routes: 
The routes are for the most part written as described on the challenge. The only
difference is that I wrote these routes as if more than one user will be accessing
this API (i.e., it isn't just Jennifer), so some "ID" parameters were added.  Also,
a minor change was added to the "add new club" route due to my extra implementation
(read below). 

For my extra implementation, I've added a new get request that gets all the clubs
in a sorted order based on popularity. Hence, as multiple users rank clubs based
on their preference, the ordering will change. (Note: this assumes that any user
that is ranking a club must rank ALL the clubs. For new clubs added, those clubs
will be automatically added to the end of the rankings for each user that has
any rankings).

Password:
I used a dependency called password-hash to store passwords. Hence, I only store
a string that can determine if the password you enter is correct, but it prevents
me from using that string to decode your password.

I used this feature so that when you edit someone's rankings, you have to enter
their password to gain access. The password for Jennifer is the same as the one
posted on the challenge website. 


Most of the API's inner workings can be displayed live on the screen due to the
front-end addition! So go and give it a try.

Thanks a ton for your time,
Anthony Mansur 

P.S.
Due to lack of time on my part, I will not be implementing the other bonus challenges,
especially since it did take quite a while to implement the front-end feature. However,
if you would be so kind, I'd urge you to check out my other project on my repository where
I've worked on a personal app. That app shows you some of my experience working with MongoDB,
and its posted on a live server via Heroku.

Link to external app: 
Repository: https://github.com/anthonymansur/budgeting-app 
Live app: http://mansur-budgeting.herokuapp.com/
