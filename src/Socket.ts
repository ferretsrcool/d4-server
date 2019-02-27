import socketIo from 'socket.io';
import { Server } from 'http';

class Socket {

  private static io: socketIo.Server;

  public static init(server: Server) {
    this.io = socketIo(server, {
      path: '/',
    });

    this.emit = this.emit.bind(this);
    this.emitSample = this.emitSample.bind(this);
    this.emitRefreshHistory = this.emitRefreshHistory.bind(this);
  }

  public static emit(event: string, value?: string) {
    this.io.sockets.emit(event, value || '');
  }

  public static emitSample(sample: string) {
    this.emit('new sample', sample);
  }

  public static emitRefreshHistory() {
    this.emit('refresh history');
  }
}

export default Socket;
