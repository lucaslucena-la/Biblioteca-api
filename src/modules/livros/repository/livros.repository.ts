import { LivroEntity } from "../domain/livro.entity";
import { CreateLivroDTO, UpdateLivroDTO } from "../dto/livros.dto";

// Filtros de leitura para listagem de livros no repositorio.
export type FindAllLivrosFilters = {
  titulo?: string;
  autor?: string;
  categoria?: string;
  status?: string;
};

// Contrato da camada de persistencia para o modulo de livros.
export interface ILivrosRepository {
  // Busca um livro por ID.
  findById(id: string): Promise<LivroEntity | null>;

  // Lista livros com filtros opcionais.
  findAll(filters?: FindAllLivrosFilters): Promise<LivroEntity[]>;

  // Cria um novo registro de livro.
  create(payload: CreateLivroDTO): Promise<LivroEntity>;

  // Atualiza campos persistidos do livro.
  update(id: string, payload: UpdateLivroDTO): Promise<LivroEntity | null>;

  // Realiza soft delete do livro.
  delete(id: string): Promise<void>;
}
