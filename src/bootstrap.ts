import * as argv from 'minimist';

const Bootstrap : IBootstrap = {

    getArgs(): AppArgs {
        let port: number = process.env.PORT || 3000;
        let host: string = process.env.host || "127.0.0.1";

        let args = argv<AppArgs>(process.argv.splice(2), {
            default: {
                host: host,
                port: port,
            },
            alias: {
                "h": "host",
                "p": "port"
            }
        });
        return args;
    }
}

export interface IBootstrap {
    getArgs(): AppArgs;
}

export interface AppArgs extends argv.ParsedArgs {
    host: string;
    port: number;
}

export default Bootstrap;