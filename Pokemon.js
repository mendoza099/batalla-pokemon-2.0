// Pokemon.js
import { Type } from './Type.js';
import { Move } from './Move.js';

export class Pokemon {
    constructor(nombre, tipo, hpMax, ataque, defensa, movimientos) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.hpMax = hpMax;
        this.hpActual = hpMax;
        this.ataque = ataque;
        this.defensa = defensa;
        this.movimientos = movimientos;
        this.puedeCurarse = true;
    }
    attack(move, enemigo) {
      const probabilidadFallo = Math.random();
      if (probabilidadFallo < 0.2) { // 20% de chance de fallar
          console.log(`${this.nombre} intentó usar ${move.nombre} pero falló!`);
          return; // Termina el turno si falla
      }
  
      // Factor aleatorio para hacer daño variable
      const randomFactor = Math.random() * (1 - 0.85) + 0.85;
      const damage = Math.max(1, Math.round(((this.ataque / enemigo.defensa) * move.dañoBase) * randomFactor));
      enemigo.hpActual = Math.max(0, enemigo.hpActual - damage); // Actualizar la vida del enemigo
  
      console.log(`💥 ${this.nombre} usó ${move.nombre}!`);
      console.log(`➡️ ${enemigo.nombre} recibió ${damage} puntos de daño.`);
      console.log(`💔 HP restante de ${enemigo.nombre}: ${enemigo.hpActual} HP`);
  
      // Actualizar la barra de vida del oponente después de un ataque
      actualizarBarraVida(enemigo, 'vida-oponente');
  }
  

  heal() {
    if (this.puedeCurarse) {
        const cantidadCurada = this.hpMax * 0.5;
        this.hpActual = Math.min(this.hpMax, this.hpActual + cantidadCurada);
        this.puedeCurarse = false;  // Deshabilitar la curación hasta el siguiente combate
        console.log(`✨ ${this.nombre} se curó! HP actual: ${this.hpActual}`);
    } else {
        console.log(`❌ ${this.nombre} no puede curarse nuevamente.`);
    }

    // Actualizar la barra de vida después de la curación
    actualizarBarraVida(this, 'vida-jugador');
}

}


