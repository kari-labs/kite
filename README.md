# Getting Started

### Dev setup full (runs front-end and back-end) - This is usually all you need
```
npm run setupDev
```

### Install all dependencies
```
npm install
```

### Production setup (builds front-end and runs back-end)
```
npm run setupProd
```

### Run testing (for Travis CI)
```
npm run test
```

# Git Workflow

### Working with Prod (Production)

The only way new code goes into the prod branch is through a pull request where every team member is required to approve. Do not perform work in prod, branch from prod, or remove the settings protecting prod. We should talk about getting into a schedule where we try for timed releases of new features and code to the prod branch.

### Working with Dev (Development)

The dev branch is the baseline for all development. You can make minor changes directly in this branch and do not need any special priviliges to work from here. However, if you are starting work on a task that you anticipate taking longer than a few hours, please create a new branch named \[INITIALS\]_\[TASKNAME\] ex MC_SecureAPI. Almost all changes made should have an issue on the Sprint Board in Asana. Please use the proper tags to color code our issues, this is an important principle of using Kanban boards. The current types are "Feature", "Bug", "Docs", and "Quality of Life". If you feel that your issue doesn't fall under any of these categories, you may create your own but please try to keep the number of tags limited. If possible, please try to link to the commit that fixes your task in the task itself on Asana. When done with your branch, please make a pull request into dev and ask at least one other person to review your pull request.

### Working with Feature Branches (New Features)

New branches should only be made for tasks that fall into the following time range - ( >3 hours of work but <3 days of work ). Please work diligently to accomplish the task you started in the 3 day timeframe. You may ask for help from the other engineers if you are struggling. Should you for some reason not be able to finish your task withing 3 days of work, you may request an extension from another engineer. Extensions grant another 2 days and should be given sparingly. Should your task not be finished within 5 days, you likely didn't break your task down enough. Think, "Does what I coded satisfy some type of sub-task?" Preferably we should try to salvage code from these branches, but if they are around for much longer than the deadline they will be deleted. The above info regarding Asana applies to these branches as well. For feature branches consider using one issue that covers the broad feature you are trying to implement, and use sub-tasks to track the various implementation steps.