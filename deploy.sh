#!/bin/bash

AWS_S3_REGION="us-east-1"
PRODUCTION_BRANCH="main"

NODE_ENV=''
CLOUDFRONT_DIST_ID=''
if [[ $TRAVIS_BRANCH == $PRODUCTION_BRANCH ]]; then
  NODE_ENV="prod"
  CLOUDFRONT_DIST_ID=$CLOUDFRONT_DIST_ID_PRODUCTION
  yarn build
else
  echo "Not deploying"
  exit
fi

# Build the name of the S3 bucket we want to deploy to
S3_BUCKET="agora-ui-$NODE_ENV"
echo "Deploying to the $S3_BUCKET bucket"

# Install the AWS CLI so we can publish to S3
pip install awscli --upgrade --user

# Sync our build folder with our S3 bucket
# --acl public-read says deploy the files with public read access
# --delete says to delete files in the bucket that aren't present in the build folder
#   this ensures that old assets built with webpack with hashed names get deleted
#   when a new build of the app is made and the assets get new hash names
aws s3 sync public/ "s3://$S3_BUCKET" --acl public-read --delete

# Force-invalidate the now-outdated assets rather than waiting for them to expire
# Make sure you have the CLOUDFRONT_DIST_ID_* env variables defined for this to work
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DIST_ID \
  --paths /*