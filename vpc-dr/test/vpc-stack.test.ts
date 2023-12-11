import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { VpcStack } from '../lib/vpc-stack';


describe('VpcStack', () => {
  let app: App;
  let stack: Stack;

  beforeAll(() => {
    app = new App();
    stack = new VpcStack(app, 'MyTestStack');
  });

  test('VPC Created', () => {
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::EC2::VPC', 1);
  });

  test('Subnets Created', () => {
   const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::EC2::Subnet', 6);
  });
   
  test('Print Synthesized Template', () => {
    const template = Template.fromStack(stack);
    console.log(JSON.stringify(template, null, 2));
  });
  
});