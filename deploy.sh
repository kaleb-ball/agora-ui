#!/bin/bash

AWS_S3_REGION="us-east-1"
PRODUCTION_BRANCH="feature/travis"

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

S3_BUCKET="agora-ui.com"
echo "Deploying to the $S3_BUCKET bucket"

pip install awscli --upgrade --user

aws s3 sync build/ "s3://$S3_BUCKET" --acl public-read --delete

aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DIST_ID \
  --paths '/*'