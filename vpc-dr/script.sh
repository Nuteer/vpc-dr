#!/bin/bash

# Set the AWS region and account details
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="123456789012"

# Optionally, you can prompt for or set the AWS credentials here
# export AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY"
# export AWS_SECRET_ACCESS_KEY="YOUR_SECRET_KEY"

# Run cdk bootstrap
echo "Running cdk bootstrap for account $AWS_ACCOUNT_ID in region $AWS_REGION"
cdk bootstrap aws://$AWS_ACCOUNT_ID/$AWS_REGION

# Check for any errors in bootstrap execution
if [ $? -ne 0 ]; then
    echo "cdk bootstrap failed"
    exit 1
else
    echo "cdk bootstrap completed successfully"
fi
