import Produto from "./Produto";

interface Categoria{
    id: number;
    tipo: string;
    produtos?: Produto[] | null;
}

export default Categoria;