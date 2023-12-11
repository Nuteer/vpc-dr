// vpc-stack.ts
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { setupNetworkingResources } from './networking-resources';

export class VpcStack extends Stack {
  public readonly publicSubnets: ec2.PublicSubnet[];
  public readonly privateSubnets: ec2.PrivateSubnet[];

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.publicSubnets = [];
    this.privateSubnets = [];

    // Create the VPC
    const vpc = new ec2.Vpc(this, 'MyVPC', {
      maxAzs: 3,
      cidr: '10.0.0.0/16',
      natGateways: 0,
      subnetConfiguration: []
    });

    // Define CIDR blocks for the public subnets
    const publicSubnetCidrBlocks = ['10.0.1.0/24', '10.0.2.0/24', '10.0.3.0/24'];

    // Manually create public subnets
    publicSubnetCidrBlocks.forEach((cidrBlock, index) => {
      const publicSubnet = new ec2.PublicSubnet(this, `PublicSubnet${index + 1}`, {
        vpcId: vpc.vpcId,
        cidrBlock,
        availabilityZone: vpc.availabilityZones[index],
        mapPublicIpOnLaunch: true
      });
      this.publicSubnets.push(publicSubnet);
    });

    // Define CIDR blocks for the private subnets
    const privateSubnetCidrBlocks = ['10.0.101.0/24', '10.0.102.0/24', '10.0.103.0/24'];

    // Manually create private subnets
    privateSubnetCidrBlocks.forEach((cidrBlock, index) => {
      const privateSubnet = new ec2.PrivateSubnet(this, `PrivateSubnet${index + 1}`, {
        vpcId: vpc.vpcId,
        cidrBlock,
        availabilityZone: vpc.availabilityZones[index]
      });
      this.privateSubnets.push(privateSubnet);
    });

    // Setup networking resources like Internet Gateway and NAT Gateway
    setupNetworkingResources(this, vpc, this.publicSubnets);
  }
}
