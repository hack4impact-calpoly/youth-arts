# pryac
Hack4Impact Cal Poly nonprofit project for Paso Robles Youth Arts Center

## Team Roster

|       Name           |        Role         |
| -----------------    | ------------------- | 
| Jillian Quinn        | Tech Lead           |
| Reilly Salkowski     | Product Manager     | 
| Skylar Kurth         | Designer            | 
| Amelia Bruscia       | Frontend Developer  | 
| Jon Banh             | Developer           | 
| Liam Shaw            | Developer           | 
| Nestor Martinez      | Backend Developer   | 
| Nicholas Tan         | Backend Developer   | 
| Tessa Tapmongkol     | Developer           | 
| Yohan Sofian         | Developer           | 

## Starting development/GitHub help

### Clone the Repo
$ git clone git@github.com:hack4impact-calpoly/pryac.git

`npm i` in both the backend and frontend directories

### Start Backend
`cd backend`
`npm run dev'

### Start Frontend
`cd frontend`
`npm start'

### Branching
#### To make a new branch:
Please name your branches relevant to the feature you are working on.  
$ git checkout -b new_branch_name

#### To switch branches and work on that branch:
$ git checkout your_branch_name

### Git
#### To refresh your local git environment with what is on GitHub after your teammates made commits: 
$ git fetch
$ git merge remotename/branchname
OR do it in one step:
$ git pull remotename branchname

#### After making edits, to see what files have changed, what files git is tracking, and what files have been staged for commit:
$ git status

#### To add all files to git before commiting, 
$ git add .

#### To add just one file
$ git add your_file_name

#### To remove a file (if needed)
$ git rm your_file_name

#### To commit your changes to git and link it to the github issue,
$ git commit -m '#[issue number] and short description of changes'

#### To push to GitHub
$ git push -u origin your_branch_name

#### To create a Pull Request
On GitHub, navigate to the branches tab and select the ‘New Pull Request’ button

Write a comment of what your change was and write the issue number so that it links together

Add @JillianQuinn as a reviewer
