# Getting Started

### Dev setup full (runs front-end and back-end) - This is usually all you need
```
npm run setup:dev
```

### Install all dependencies
```
npm install
```

### Run Linter
```
npm run lint
```

### Production setup (builds front-end and runs back-end)
```
npm run setup:prod
```

### Run testing (for Travis CI)
```
npm run test
```

### Run build (for NGINX server)
```
npm run build:nginx
```
<small>This script builds `kite-web-element` into `kite-nginx/app` </small>


# Git Workflow

### Working with Prod (Production)

The only way new code goes into the prod branch is through a pull request where every team member is required to approve. Do not perform work in prod, branch from prod, or remove the settings protecting prod. We should talk about getting into a schedule where we try for timed releases of new features and code to the prod branch.

### Working with Dev (Development)

The dev branch is the baseline for all development. You can make minor changes directly in this branch and do not need any special priviliges to work from here. However, if you are starting work on a task that you anticipate taking longer than a few hours, please create a new branch named \[TASKNAME\] ex. SecureAPI. Almost all changes made should have an issue on the Sprint Board in Asana. Please use the proper tags to color code our issues, this is an important principle of using Kanban boards. The current types are "Feature", "Bug", "Docs", and "Quality of Life". If you feel that your issue doesn't fall under any of these categories, you may create your own but please try to keep the number of tags limited. If possible, please try to link to the commit that fixes your task in the task itself on Asana. When done with your branch, please make a pull request into dev and ask at least one other person to review your pull request.

### Working with Feature Branches (New Features)

New branches should only be made for tasks that fall into the following time range - ( >3 hours of work but <3 days of work ). Please work diligently to accomplish the task you started in the 3 day timeframe. You may ask for help from the other engineers if you are struggling. Should you for some reason not be able to finish your task withing 3 days of work, you may request an extension from another engineer. Extensions grant another 2 days and should be given sparingly. Should your task not be finished within 5 days, you likely didn't break your task down enough. Think, "Does what I coded satisfy some type of sub-task?" Preferably we should try to salvage code from these branches, but if they are around for much longer than the deadline they will be deleted. The above info regarding Asana applies to these branches as well. For feature branches consider using one issue that covers the broad feature you are trying to implement, and use sub-tasks to track the various implementation steps.

# Code Styling

### Why?

There are a myriad of reasons why you should use a style guide. The reason that I think applies best to us is that over time it boosts productivity and keeps us focused on what really matters. With a consistent code style we sacrifice some personal opinions regarding code but it helps us in the long run.

### How?

We have a script setup which will run ESLint on all of our JavaScript and Vue files and output any errors or warnings to your console in a neat format. The command to run the linting script is ``` npm run lint ```. There is also a linter that runs automatically every time you commit code. It will check all of your JS and Vue changes to make sure they follow a consistent style and enforce best practices. If you get any ESLint errors, your commit will be blocked and you will be asked to fix the errors. If you believe that the error is wrong or otherwise not needed you can skip this step by using the --no-verify arguement at the end of your git commit command.

# Building for Production

### The Automated Script

To handle all this automatically you can simply run ``` npm run setup:prod ```.

### Vue Build

To build the front-end for production you can run ``` npm run build ``` which takes all of our Vue code and outputs a dist directory which contains our static app. Where the command outputs the Vue files can changed using the "outputDir" variable in vue.config.js.

### NGINX Serves Static Files

Currently the plan is to use the NGINX server to serve our static app. Because most of our application interacts with an API to perform actions, it is considered static content. Using the NGINX server over the Express server or some other altenative gives a little performance boost as there is less routing that the user request goes through. We could also look into using Content-Caching in NGINX to give us even more of a performance boost.

### The API + NGINX Containers

Right now the API and NGINX are in their own containers. The Vue build will go into the NGINX container and be hosted there. The only change from running the API + NGINX containers normally is that you have to use the right docker-compose file. To specify which docker-compose file to use, use the -f parameter. Currently our GCP server is Ubuntu linux and would require the use of the docker-compose.linux.yml file.