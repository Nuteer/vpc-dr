import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { VpcStack } from '../lib/vpc-stack';

describe('VpcStack', () => {
  let app: App;
  let stack: Stack;
  let template: Template; // Declare the template variable here

  beforeAll(() => {
    app = new App();
    stack = new VpcStack(app, 'MyTestStack');
    template = Template.fromStack(stack); // Initialize the template variable here
  });

  test('VPC Created', () => {
    template.resourceCountIs('AWS::EC2::VPC', 1);
  });

  test('Subnets Created', () => {
    template.resourceCountIs('AWS::EC2::Subnet', 6);
  });

  test('Print Synthesized Template', () => {
    console.log(JSON.stringify(template, null, 2));
  });

  test('Subnet Names', () => {
    const publicSubnetNames = ['public-one', 'public-two', 'public-three'];
    publicSubnetNames.forEach(name => {
      template.hasResourceProperties('AWS::EC2::Subnet', {
        Tags: [{ Key: 'Name', Value: name }]
      });
    });

    const privateSubnetNames = ['private-one', 'private-two', 'private-three'];
    privateSubnetNames.forEach(name => {
      template.hasResourceProperties('AWS::EC2::Subnet', {
        Tags: [{ Key: 'Name', Value: name }]
      });
    });
  });
});
