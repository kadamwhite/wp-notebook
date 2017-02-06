# Loutky

This is my own personal project boilerplate. It gives me (and you) a Webpack 2 build pre-configured for React with hot module replacement; Stylus stylesheets; ESLint (following the AirBnB config); and webpack dev server for local development. Edit the name of the package and go&mdash;scripts are in `/src/scripts`.

## Installing & running the application

From the command line, paste in these commands to pull down the boilerplate and initialize your repository. (These commands are only tested on OSX/linux: on Windows you're unfortunately on your own, but I recommend investigating the Windows Subsystem for Linux.)

```bash
git clone --depth 1 git@github.com:kadamwhite/loutky.git && ./loutky/init.sh
```

This will run the project setup script that will complete the installation.

Once installed, use the command `npm start` to spin up the development server, which will then be accessible at [http://localhost:8080](http://localhost:8080)
