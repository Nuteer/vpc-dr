import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export function setupNetworkingResources(scope: Construct, vpc: ec2.Vpc, publicSubnets: ec2.PublicSubnet[]): void {

  const igw = new ec2.CfnInternetGateway(scope, 'InternetGateway');
  new ec2.CfnVPCGatewayAttachment(scope, 'VpcGatewayAttachment', {
    vpcId: vpc.vpcId,
    internetGatewayId: igw.ref
  });


  if (publicSubnets.length === 0) {

    throw new Error('No public subnets provided for NAT Gateway setup.');
  }


  const eip = new ec2.CfnEIP(scope, 'NatEip', { domain: 'vpc' });
  const natGateway = new ec2.CfnNatGateway(scope, 'NatGateway', {
    subnetId: publicSubnets[0].subnetId,
    allocationId: eip.attrAllocationId
  });

  vpc.privateSubnets.forEach((subnet, index) => {
    new ec2.CfnRoute(scope, `PrivateSubnetRoute${index}`, {
      routeTableId: subnet.routeTable.routeTableId,
      destinationCidrBlock: '0.0.0.0/0',
      natGatewayId: natGateway.ref
    });
  });
}
