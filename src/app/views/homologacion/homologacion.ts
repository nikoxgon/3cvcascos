export class Homologacion {
	casId: number;
	solRut: string;
	casMarca: string;
	casModelo: string;
	casOrigen: string;
	casLote: string;
	casFabricante: string;
	casImagen1: string;
	homAcreditacion: string;
	homFecha: string;
	homQrcode1: string;
	homQrcode2: string;
	solNombre: string;
  }
  
  export interface IHomologacion {
	homAcreditacion?: number;
	solRut?: string;
	homFecha1?: string;
	homFecha2?: string;
	casFabricante?: string;
	casMarca?: string;
	casModelo?: string;
  }
  