import socketIo from 'socket.io';
import { Server } from 'http';

import { Document } from 'mongoose';

class Socket {

  private static io: socketIo.Server;

  public static init(server: Server) {
    this.io = socketIo(server);

    this.emit = this.emit.bind(this);
    this.emitSample = this.emitSample.bind(this);
    this.emitReading = this.emitReading.bind(this);
  }

  public static emit(event: string, value?: string) {
    this.io.sockets.emit(event, value || '');
  }

  public static emitSample(sample: string) {
    this.emit('new sample', sample);
  }

  public static emitReading(reading: Document) {
    this.emit('new reading', JSON.stringify(reading));
  }
}

export default Socket;
