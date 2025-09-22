using api.DTOs;
using api.DTOs.Requests.Book;

namespace api.Service;

public interface IBookService
{
    Task<List<BookDTO>> GetAllBooksAsync();
    Task<BookDTO> CreateBookAsync(CreateBookDTORequest dto);
    Task<BookDTO> UpdateBookAsync(UpdateBookDTORequest dto);
    Task<BookDTO> DeleteBookAsync(DeleteBookRequestDTO dto);
}