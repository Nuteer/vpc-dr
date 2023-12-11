#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';

const app = new App();
new VpcStack(app, 'VpcStack');

