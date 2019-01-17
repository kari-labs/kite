# Why do this?

Awhile back Kyle Gray and I (Matt Conway), talked about moving Kite-Web and any other repos into the "Kite" as to have one centralized source of code. No more cloning two repositories and git pulling twice, git adding twice, git committing twice, git pushing twice. Now everything is in one repo. You make changes across the API, NGINX config, and the Front-End? No problem, just make sure you are at the root of the repo (./kite/) and you can commit all those changes at once.

You will still need two terminal tabs open to run the back-end and front-end, and you will still have to remember to cd into the right directory when trying to run things, but I think that this would be a beneficial change that would help us be a little bit more productive.

# Getting Started

### Here I will guide you through a complete setup of a dev environment

First  things first. We need to install all of our various dependencies. At some point I may automate this step into a Build process that you can run from the root of repo. Open a terminal, cd into your 'kite-api' directory (cd kite-api), and run 'npm i'. This will install all the dependencies we need to properly run the back-end API. Next we need to cd up a level (cd ..), and then cd into 'kite-web-element' (cd kite-web-element). Install dependencies here (npm i). Now that we have all our dependencies installed, we can start to run our program. I reccommend splitting the terminal view into two panes. On one side, cd up to the root of the repo (./kite/), and run docker-compose up -D. This should create our API container and NGINX container without any errors. On the other side, cd into 'kite-web-element' (cd kite-web-element), and run 'npm run serve'. Now, assuming no errors, you should have the back-end API and front-end both running and ready for development! To recap, here are the steps we took.

1. CD into 'kite-api', run (npm i) to install dependencies.
2. CD into 'kite-web-element', run (npm i) to install dependecies.
3. Split terminal view into two panes.
4. In one, CD to root of repo (./kite/) and run (docker-compose up -D). -D runs the process in detached mode, remove that parameter if you need to see logs.
5. In the other, CD into 'kite-web-element' and run (npm run serve).
6. You're done!