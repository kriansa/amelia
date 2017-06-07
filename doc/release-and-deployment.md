# Release and deployment

Our release and deployment process is pretty simple:

> `master` -> `staging` -> `production`

Whenever the code on master is ready enough to be deployed, we merge that
branch into `staging`. Our CI server will automatically deploy that into our
Heroku test app.

If that is good to go to production, we merge it into production. Easy like
that. The deploy will be done automatically as well.
