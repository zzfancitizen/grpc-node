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

function main() {
    let client = new myapi.Greeter('localhost:50051', grpc.credentials.createInsecure());
    let request = {
        name: "HelloWorld"
    };
    client.sayHi({name: "HelloWorld"}, (err, response) => {
        if (err) {
            console.error(err)
        } else {
            console.log(response)
        }
    })
}

main();