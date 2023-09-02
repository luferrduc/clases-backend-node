class TicketManager {
  #precioBaseGanancia = 0.15;

  constructor() {
    this.eventos = [];
  }

  getEventos() {
    return this.eventos;
  }

  agregarEvento(
    nombre,
    lugar,
    precio,
    capacidad = 50,
    fecha = new Date().toLocaleDateString()
  ) {
    const evento = {
      nombre,
      lugar,
      precio: precio + precio * this.#precioBaseGanancia,
      capacidad,
      fecha,
      participantes: [],
    };

    if (this.eventos.length === 0) {
      evento.id = 1;
    } else {
      evento.id = this.eventos[this.eventos.length - 1].id + 1;
    }

    this.eventos.push(evento);
  }
}
