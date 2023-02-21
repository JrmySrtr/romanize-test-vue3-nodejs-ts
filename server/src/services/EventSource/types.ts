import type { Request, Response } from 'express'
export type TRAM_NAMESPACE = Map<string, Map<string, TClientSource>>

export type TClientSource = {
    source: Response
}

export interface IEventSourceManager {
    emit(request: Request, events: string[], data: JSON): void;
    broadcast(request: Request, events: string[], data: JSON): void;
}