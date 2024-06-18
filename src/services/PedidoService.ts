import IPedido from "../types/IPedido";
import PedidoPost from "../types/post/PedidoPost";
import BackendClient from "./BackendClient";


export default class PedidoService extends BackendClient<IPedido | PedidoPost> {}


