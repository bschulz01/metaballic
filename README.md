# Metabalic

Metaballic is an IoT-enabled basketball tracker that adds a new dimension to a classic game.
Live statistics wandith interactive user feedback come together to form a beautiful user experience,
bridging the world between sports and e-sports.

This project was created for IDEA Hacks 2022, the West Coast's largest hardware-based hackathon,
More information can be found on the official hackathathon submission here: [https://devpost.com/software/metaballic](https://devpost.com/software/metaballic)

## Setup
To install the node packages, run 
```npm install```

Assuming all installs were successful, run the project locally using
```npm start```

## NPM Install Errors
Sometimes there are errors that arise with installing the Node packages.
Ususally, reattempting installation with the `--peer-legacy-deps` flag solves these issues.
```npm i --peer-legacy-deps```

One alternative possibility is permission issues.
To solve this create a local npm package folder that you have permission to.
Create a new folder for packages:
```mkdir ~/.npm-global```
Add this folder to the defailt path in your bash profile:
```export PATH=$PATH:~/.npm-global```
Set the npm config to have this path:
```npm config set ~/.npm-global```
