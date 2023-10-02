# Tutorial for git

## Part 1: FIRST TIME SETUP

Step 1: set up git on your computer

[Setup git by using this link](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Step 2: Create the folder on your computer for the react project
```
$ git clone https://github.com/Rocket8900/AfterZOOM.git
```

Step 3: Navigate to your branch using git checkout nameofyourbranch (to see what your branch is go https://github.com/Rocket8900/AfterZOOM/branches)

In the event you cant seem to go to your branch, check if your branch is there by using git branch -a. If you dont see your branch on your computer, type git fetch.

Step 4: Go to the folder in your command line and run npm install 



## Part 2: To run the project

Go to your project file in terminal/cmd
```
npm start
```

go to http://localhost:3000/ for the react project




## PART 3: Process of updating something 

After you edit a portion, do the following
```
git add .

git commit -m "message" (see our tele group pic for the naming conventions for commits)

git pull origin main (check if any conflicts)

git push origin nameofyourbranch

```

After which, go to github our github repo and click on pull requests. (https://github.com/Rocket8900/AfterZOOM/pulls). See if there are any issues then create a pull request and merge. 

Bam, it is updated.
