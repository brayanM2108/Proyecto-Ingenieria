/*

    Programado por Luis Cabrera Benito 
  ____          _____               _ _           _       
 |  _ \        |  __ \             (_) |         | |      
 | |_) |_   _  | |__) |_ _ _ __ _____| |__  _   _| |_ ___ 
 |  _ <| | | | |  ___/ _` | '__|_  / | '_ \| | | | __/ _ \
 | |_) | |_| | | |  | (_| | |   / /| | |_) | |_| | ||  __/
 |____/ \__, | |_|   \__,_|_|  /___|_|_.__/ \__, |\__\___|
         __/ |                               __/ |        
        |___/                               |___/         
    
    
    Blog:       https://parzibyte.me/blog
    Ayuda:      https://parzibyte.me/blog/contrataciones-ayuda/
    Contacto:   https://parzibyte.me/blog/contacto/
*/
import {Component, OnInit} from '@angular/core';
import {CarritoService} from "./carrito.service";
import {DataSharingService} from "./data-sharing.service";
import { ProductosService } from './productos.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  search : string = "";
  title = 'e-commerce-angular-node';
  public productos = [];
 
  constructor(
    private carritoService: CarritoService,
    private dataSharingService: DataSharingService,
    private productosService: ProductosService
     ) {
    // Comunicación entre componentes
    this.dataSharingService.currentMessage.subscribe(mensaje => {
      if (mensaje == "car_updated") {
        this.refrescarCarrito();
      }
    })
  }

  public async refrescarCarrito() {
    this.productos = await this.carritoService.obtenerProductos();
  }

  public total() {
    // Quién te conoce reduce
    let total = 0;
    this.productos.forEach(p => total += p.precio);
    return total;
  }

  ngOnInit(): void {
    this.refrescarCarrito();
  }

  public async loadVinyl() {
    const filter = this.search.trim().length > 0 ? `?searchBy=${encodeURIComponent(this.search)}` : '';
    try {
      const productos = await this.productosService.getAll(filter);
      this.productos = productos;
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }
  
  
  
  
}
