# Production

When deploying to production, let's try to have the following points in mind:

## Environment variables

* `BUNDLE_WITHOUT` - **Value**: `test:development`
* `RACK_ENV` - **Value**: `production`
* `NODE_ENV` - **Value**: `production`

## Branch

What is in production should be at the branch `production`. End of story.
