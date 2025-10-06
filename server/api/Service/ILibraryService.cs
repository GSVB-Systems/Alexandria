using api.DTOs;
using api.DTOs.Requests;
using api.DTOs.Requests.Author;
using api.DTOs.Requests.Book;
using scaffold;

namespace api.Services;

public interface ILibraryService
{
    Task<List<AuthorDTO>> GetAuthors();
    Task<List<BookDTO>> GetBooks(int skip = 0, int take = Int32.MaxValue);
    Task<List<GenreDTO>> GetGenres();
    Task<BookDTO> CreateBook(CreateBookDTORequest dto);
    Task<BookDTO> UpdateBook(UpdateBookDTORequest dto);
    Task<BookDTO> DeleteBook(string id);
    Task<AuthorDTO> CreateAuthor(CreateAuthorRequestDto dto);
    Task<AuthorDTO> UpdateAuthor(UpdateAuthorRequestDto dto);
    Task<AuthorDTO> DeleteAuthor(string authorId);
    Task<GenreDTO> CreateGenre(CreateGenreDTORequest dto);
    Task<GenreDTO> DeleteGenre(string genreId);
    Task<GenreDTO> UpdateGenre(UpdateGenreDTORequest dto);
    Task<List<AuthorDTO>> GetAuthorDtos();
}