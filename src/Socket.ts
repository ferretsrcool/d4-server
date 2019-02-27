import socketIo from 'socket.io';
import { Server } from 'http';

class Socket {

  private static io: socketIo.Server;

  public static init(server: Server) {
    this.io = socketIo(server, {
      path: '/rt',
    });
  }
}

export default Socket;
