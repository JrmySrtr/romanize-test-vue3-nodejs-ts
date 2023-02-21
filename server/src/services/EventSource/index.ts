import { Request, Response } from 'express'
import { IEventSourceManager, TClientSource, TRAM_NAMESPACE } from './types'
import querystring from 'node:querystring';

const RAM_SOURCES: TRAM_NAMESPACE = new Map()

const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Transfer-Encoding': 'identity',
}

export function createEventSource(namespace: string) {
    
    return function (req: Request, res: Response) {
        const query = querystring.parse(req.url.split('?')[1]);
        const xevents = query?.id as string;
        if (xevents) {
            let source = RAM_SOURCES.get(namespace)
            if (!source) {
                source = new Map();
            }
            const client = source.get(xevents)
            if (!client) {
                const client = { source: res }
                res.writeHead(200, headers)
                source.set(xevents, client)
                req.on('close', () => {
                    source.delete(xevents)
                })
                RAM_SOURCES.set(namespace, source);
            }
        }
    }
}

export class EventSourceManager implements IEventSourceManager {
    private namespace: string

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    emit(request: Request, events: string[], data: any): void {
        const xevents = request.headers['x-events'] as string
        const source = RAM_SOURCES.get(this.namespace)
        if (source && xevents) {
            const client = source.get(xevents)
            const stream = JSON.stringify({ events, data })
            if (client) client.source.write('data: ' + stream + '\n\n')
        } else {
            console.warn('Invalid x-event header ID')
        }
    }

    broadcast(request: Request, events: string[], data: any): void {
        const xevents = request.headers['x-events']
        const source = RAM_SOURCES.get(this.namespace)
        if (source) {
            const stream = JSON.stringify({ events, data })
            for (const [key, client] of source) {
                if (!xevents || key !== xevents) {
                    client.source.write('data: ' + stream + '\n\n')
                }
            }
        }
    }
}
