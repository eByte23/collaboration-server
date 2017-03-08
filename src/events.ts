export module Events {
    export class ChangeEvent implements IEvent {

        constructor(diff: Diff, by: string) {
            this.data = diff;
            this.by = by;
        }

        by: string; // TODO: This could change to an ID given when connecting to session
        data: Diff;
        type: string = "ChangeEvent";
    }

    export interface Diff {
        relativeFileName: string;
        delta: string;
        checksum: string;
        version: number;
        lastRecievedVersion: number;
    }

    export class JoinSession implements IEvent {
        constructor(sessionId: string, by: string) {
            this.by = by;
            this.sessionId = sessionId;
        }

        by: string;
        data: any;
        type: string = "JoinSession";
        sessionId: string;
    }

    export class StartSession implements IEvent {
        constructor(sessionId: string, by: string) {
            this.by = by;
            this.sessionId = sessionId;
        }

        by: string;
        data: any;
        type: string = "StartSession";
        sessionId: string;
    }
}

export interface IEvent {
    by: string,
    data: any,
    type: string
}

export interface SocketHandler {
    handle(socket: SocketIO.Socket, fn: (err?: any) => void): void;
}