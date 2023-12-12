# VPC-DR CDK TypeScript project

This project demonstrates the use of AWS CDK to create a custom VPC with specific networking resources, including public and private subnets, an Internet Gateway, and a NAT Gateway. The project is structured to enhance readability and maintainability and includes a Docker configuration for easy deployment.

## Project Structure

- `lib/vpc-stack.ts`: Defines the VPC stack including the creation of VPC, subnets, and calls to networking setup.
- `lib/networking-resources.ts`: Contains logic for setting up Internet Gateway and NAT Gateway.
- `bin/vpc-dr.ts`: Entry point for the CDK application.
- `test/`: Contains test files for the CDK resources.
- `Dockerfile`: Used for building a Docker image for the CDK application.

## Usage Instructions

### Checking the CDK Synthesis

To synthesize the CloudFormation template for the stack:

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template



## Running Tests

To run tests with Jest:

* `npm test` This command will execute the test suite defined in the test/ directory.

## How to Use this Script.sh

* `chmod +x script.sh` Permissions: Ensure that the script has execution permissions

* `./script.sh` Running the Script: Execute the script before you start your CDK deployment process. This can be done manually, or as part of a CI/CD pipeline setup.

## Building and Running the Docker Image


* `docker build -t cdk-vpc-app .` Build the Docker image

* `docker run -e AWS_DEFAULT_REGION=us-east-2 -it cdk-vpc-app` Run the Docker image

## Additional Considerations 

AWS Credentials: Ensure AWS credentials are available to the Docker container. You might need to pass them as environment variables or mount an AWS credentials file.
Security: Be cautious with handling AWS credentials. Avoid including them directly in the Dockerfile.
NAT Gateway Placement: The NAT Gateway is placed in the first public subnet. Adjust as needed based on your topology.



