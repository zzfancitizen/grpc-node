const PROTO_PATH = '../proto/myapi.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
let protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

let myapi = protoDescriptor.myapi;

function sayHi(call, callback) {
    callback(null, {message: "My reply is " + call.request.name})
}

function main() {
    let server = new grpc.Server();
    server.addService(myapi.Greeter.service, {sayHi: sayHi});
    server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();