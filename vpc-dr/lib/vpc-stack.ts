import { Stack, StackProps, Tags } from 'aws-cdk-lib';
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

    const vpc = new ec2.Vpc(this, 'MyVPC', {
      maxAzs: 3,
      cidr: '10.0.0.0/16',
      natGateways: 0,
      subnetConfiguration: []
    });

    for (let i = 0; i < 3; i++) {
      const publicSubnet = new ec2.PublicSubnet(this, `PublicSubnet${i + 1}`, {
        availabilityZone: vpc.availabilityZones[i],
        vpcId: vpc.vpcId,
        cidrBlock: `10.0.${i + 1}.0/24`
      });
      Tags.of(publicSubnet).add('Name', `public-${['one', 'two', 'three'][i]}`);
      this.publicSubnets.push(publicSubnet);
    }

    for (let i = 0; i < 3; i++) {
      const privateSubnet = new ec2.PrivateSubnet(this, `PrivateSubnet${i + 1}`, {
        availabilityZone: vpc.availabilityZones[i],
        vpcId: vpc.vpcId,
        cidrBlock: `10.0.10${i + 1}.0/24`
      });
      Tags.of(privateSubnet).add('Name', `private-${['one', 'two', 'three'][i]}`);
      this.privateSubnets.push(privateSubnet);
    }

    setupNetworkingResources(this, vpc, this.publicSubnets);
  }
}
