using api.DTOs;
using api.DTOs.Requests.Book;
using scaffold;


namespace api.Service;

public interface IBookService
{
    Task<List<Book>> GetAllBooksAsync(GetBookRequestDto dto);
    Task<BookDTO> CreateBookAsync(CreateBookDTORequest dto);
    Task<BookDTO> UpdateBookAsync(UpdateBookDTORequest dto);
    Task<BookDTO> DeleteBookAsync(DeleteBookRequestDTO dto);
    
}