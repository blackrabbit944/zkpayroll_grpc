import {CheckSign} from './src/services/check_sign.js';

import {grpc_port,token} from './config.json'

const grpc  = require('@grpc/grpc-js'); 
const protoLoader  = require('@grpc/proto-loader'); 

const PROTO_PATH = __dirname + '/src/zkpayroll.proto';

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
let zkpayroll_proto = grpc.loadPackageDefinition(packageDefinition).zkpayroll;



/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc.Server();
    server.addService(zkpayroll_proto.ZkpayrollGrpc.service, {
        CheckSign : CheckSign,
    });

    if (!grpc_port) {
        grpc_port = 50051;
    }

    server.bindAsync('0.0.0.0:'+grpc_port, grpc.ServerCredentials.createInsecure(), () => {
        console.log('Zkpayroll-GRPC已经开启,端口'+grpc_port+'...')
        server.start();
    });
}

main();
