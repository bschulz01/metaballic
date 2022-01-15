#Metabolic

Ideahacks 2022!

Let's make basketball a whole new experience

##Setup
To install the node packages, run 
```npm install```

Assuming all installs were successful, run the project locally using
```npm start```

##NPM Install Errors
Sometimes there are permission errors with installing the npm packages.
To fix these, create a local npm package folder that you have permission to.
Create a new folder for packages
```mkdir ~/.npm-global```
Add this folder to the defailt path in your bash profile
```export PATH=$PATH:~/.npm-global```
Set the npm folder with 
```npm config set ~/.npm-global```

Or try 
```npm i --peer-legacy-deps```
