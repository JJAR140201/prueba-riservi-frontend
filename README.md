# Sistema de Reservaciones - Frontend

Este repositorio contiene la implementación del frontend para el sistema de reservaciones, desarrollado con React. Este frontend interactúa con el backend del sistema y proporciona una interfaz para gestionar clientes, horarios disponibles, horarios reservados y reservaciones.

---

## **Descripción del Proyecto**

El frontend está diseñado para ser simple y funcional, permitiendo a los usuarios realizar las siguientes acciones:

1. **Clientes**:
   - Crear, leer, actualizar y eliminar clientes.

2. **Horarios Disponibles**:
   - Gestionar los horarios que se pueden reservar.

3. **Horarios de Reserva**:
   - Gestionar los horarios que han sido reservados.

4. **Reservaciones**:
   - Crear, leer, actualizar y eliminar reservaciones.

El diseño se enfoca en la claridad y la facilidad de uso, con componentes reutilizables y estilos básicos en CSS.

---

## **Características Técnicas**

### **Framework**
- **React**: Desarrollo basado en componentes.

### **Estilos**
- **CSS**: Estilos básicos para una interfaz limpia y funcional.

### **Consumo de API**
- **Axios**: Para realizar peticiones HTTP al backend.

### **Interacción con el Backend**
El frontend se conecta al backend del sistema desarrollado en Spring Boot, que puedes encontrar en el siguiente repositorio:  
[Repositorio Backend - prueba-riservi-backend](https://github.com/JJAR140201/prueba-riservi-backend)

---

## **Componentes Principales**

1. **Gestión de Clientes**
   - Componente: `Cliente`
   - Funcionalidad: Permite ver, agregar, editar y eliminar clientes.

2. **Gestión de Horarios Disponibles**
   - Componente: `HorarioDisponible`
   - Funcionalidad: Permite gestionar los horarios disponibles para reservaciones.

3. **Gestión de Horarios de Reserva**
   - Componente: `HorarioReserva`
   - Funcionalidad: Permite gestionar los horarios ya reservados.

4. **Gestión de Reservaciones**
   - Componente: `Reservacion`
   - Funcionalidad: Permite ver, crear, editar y eliminar reservaciones.
