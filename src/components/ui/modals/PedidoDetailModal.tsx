import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import IPedido from '../../../types/IPedido';

interface PedidoDetailModalProps {
  open: boolean;
  onClose: () => void;
  pedido: IPedido | null;
}

const PedidoDetailModal: React.FC<PedidoDetailModalProps> = ({ open, onClose, pedido }) => {
  if (!pedido) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalles del Pedido</DialogTitle>
      <DialogContent>
        <Typography variant="body1">ID Pedido: {pedido.id}</Typography>
        <Typography variant="body1">Forma de Pago: {pedido.formaPago}</Typography>
        <Typography variant="body1">Fecha: {pedido.fechaPedido}</Typography>
        <Typography variant="body1">Estado: {pedido.estado}</Typography>
        <Typography variant="h6">Detalles:</Typography>
        {pedido.detallePedidos.map((detalle, index) => (
          <Typography key={index} variant="body2">
            {detalle.idArticulo} - Cantidad: {detalle.cantidad} - Total: ${detalle.subTotal}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PedidoDetailModal;
